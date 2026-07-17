// FIXME move this script somewhere more idiomatic for this project if there is such a place

import * as achecker from 'accessibility-checker';
import { createServer } from 'http';
import next from 'next';
import { getNextRoutes } from '@pigsty/next-routes-list';
import * as path from 'path';
import { parseArgs, promisify } from 'util';
import * as fs from 'fs/promises';

/* See:
- https://nextjs.org/docs/pages/guides/custom-server
- https://github.com/IBMa/equal-access/blob/3744f476005a460843c1dc55af4df9cf63c38326/accessibility-checker/boilerplates/batch-scan/main.js
- https://github.com/IBMa/equal-access/tree/3744f476005a460843c1dc55af4df9cf63c38326/accessibility-checker/boilerplates/jest
- https://github.com/IBMa/equal-access/wiki#baseline-basics
*/

// https://stackoverflow.com/a/54182992/8762161
using disposer = new DisposableStack();
disposer.defer(() => {
  process.stdin.pause();
});

const { values: args } = parseArgs({
  strict: true,
  allowNegative: true,
  allowPositionals: false,
  options: {
    help: { type: 'boolean', short: 'h', default: false },
    'root-directory': { type: 'string', default: '.' },
    route: { type: 'string', short: 'r', multiple: true, default: [] },
    'print-full-failures': { type: 'boolean', short: 'v', default: false },
    'pause-before-exit': { type: 'boolean', short: 'p', default: false },
    'pause-on-fail': { type: 'boolean', short: 'P', default: false },
  },
});
if (args.help === true) {
  console.log(`\
usage: testAccessibility [OPTIONS]

Options:
  [--help]
    print this message
  [--root-directory PATH]
    the root folder of the repository (default: .)
  [-r|--route ROUTE]
    routes to test. can be repeated for multiple (-r /a -r /b).
    defaults to all routes.
  [-v|--print-full-failures]
    print a human-readable version of each failure to stdout,
    rather than just writing them to a file.
  [-p|--pause-before-exit]
    when finished, will keep the local server running instead of exiting.
    useful if you want to pull up the site to view the problems.
  [-P|--pause-on-fail]
    similar to --pause-before-exit, but pauses after each individual route.
`);
  process.exit(1);
}

/** root dir of the repo */
const REPO_ROOT = args['root-directory'];
/** root dir for nextjs */ // (currently same as repo root)
const NEXT_PROJECT_ROOT = REPO_ROOT;
/** nextjs src directory */ // (currently in /src subdir rather than top-level)
const NEXT_SRC = path.join(NEXT_PROJECT_ROOT, 'src');
// (must be relative for achecker, they don't handle absolute baseline paths right.
//  thus why we convert it to a relative path here)
const ACHECKER_FILES_ROOT = path.relative(process.cwd(), path.join(REPO_ROOT, 'achecker'));
const ACHECKER_OUTPUTS_DIR = path.join(ACHECKER_FILES_ROOT, 'output');
const ACHECKER_BASELINES_DIR = path.join(ACHECKER_FILES_ROOT, 'baselines');

if (args.route.length === 0) {
  args.route = getNextRoutes(NEXT_SRC);
}

// WARNING: DO NOT set `cacheFolder` in the config here. you will crash achecker. i don't feel like figuring out why
const ACHECKER_CONFIG: Parameters<typeof achecker.setConfig>[0] = {
  outputFolder: ACHECKER_OUTPUTS_DIR,
  baselineFolder: ACHECKER_BASELINES_DIR,
  // @ts-expect-error: eRuleLevel isn't exported so we can't do this properly. but these are the correct values
  failLevels: ['violation', 'potentialviolation', 'recommendation', 'potentialrecommendation', 'review'],
  outputFilenameTimestamp: true,
  outputFormat: ['json', 'html'],
};

/** produces the string label we use to uniquely identify a page on our site in achecker */
function urlToLabel(url: URL): string {
  const trimmed = url.pathname.replace(/^\//, '');
  if (trimmed.length === 0) return 'index';
  return encodeURIComponent(trimmed);
}

async function pressEnterToContinue(msg?: string) {
  console.log(msg ?? 'Press enter to continue...');
  await new Promise((resolve) => process.stdin.once('data', resolve));
}

async function main() {
  await using disposer = new AsyncDisposableStack();

  disposer.defer(achecker.close);

  // set up nextjs server
  const app = disposer.adopt(next({ dev: false, dir: NEXT_PROJECT_ROOT }), (app) => app.close());
  await app.prepare();
  const server = disposer.adopt(createServer(app.getRequestHandler()), (server) =>
    promisify(server.close.bind(server))()
  );
  await new Promise<void>((resolve) => {
    server.once('listening', () => resolve());
    server.listen();
  });

  // get the server's url
  const address = server.address();
  if (typeof address === 'string' || address === null) {
    // (see docs for `.address()` -- we should have one since listening event has already fired, and we shouldn't have a
    //  string because we're not doing any of the things that produces a string return value i don't think)
    throw new Error('got bad address from server (this should never happen so something went wrong somewhere)');
  }
  const baseUrl = new URL(
    `http://${address.family === 'IPv6' ? `[${address.address}]` : address.address}:${address.port}`
  );
  console.log(`serving on ${baseUrl}`);

  await achecker.setConfig(ACHECKER_CONFIG);

  for (const route of args.route) {
    await testRoute(route, baseUrl);
  }

  if (args['pause-before-exit']) await pressEnterToContinue();
}

async function testRoute(route: string, baseUrl: URL) {
  await using disposer = new AsyncDisposableStack();

  const url = new URL(route, baseUrl);
  const label = urlToLabel(url);
  console.group(label);
  disposer.defer(() => {
    console.groupEnd();
  });

  const results = await achecker.getCompliance(url.toString(), label);
  const report = results.report;
  // (check for report is achecker.ICheckerError)
  if ('details' in report) {
    throw new Error(`achecker failed to analyze route '${route}': ${String(report.details)}`);
  }

  const compliance = achecker.assertCompliance(report);
  console.log(achecker.eAssertResult[compliance]);
  if (compliance !== achecker.eAssertResult.PASS) {
    if (args['print-full-failures']) {
      console.error(achecker.stringifyResults(report));
    }
    console.log(
      `find report at ${['html', 'json'].map((ext) => path.join(ACHECKER_OUTPUTS_DIR, `${label}.${ext}`)).join(' or ')}`
    );
    const baseline = achecker.getBaseline(label);
    const diffPath = path.join(ACHECKER_OUTPUTS_DIR, `${label}.diff.json`);
    await fs.rm(diffPath, { recursive: false, force: true });
    if (baseline === null) console.warn('no baseline.');
    else {
      const diff = achecker.diffResultsWithExpected(report, baseline, true);
      fs.writeFile(diffPath, JSON.stringify(diff, undefined, '  '));
      console.warn(`baseline was present. find report<->baseline diff at ${diffPath}`);
    }
    if (args['pause-on-fail']) {
      await pressEnterToContinue(`Pausing for manual check. Failed page available at: ${url}`);
    }
  }
}

await main();
