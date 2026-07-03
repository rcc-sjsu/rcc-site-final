// FIXME move this script somewhere more idiomatic for this project if there is such a place

import * as achecker from 'accessibility-checker';
import { createServer } from 'http';
import next from 'next';
import { getNextRoutes } from '@pigsty/next-routes-list';
import * as path from 'path';
import { promisify } from 'util';
import * as fs from 'fs/promises';

/* See:
- https://nextjs.org/docs/pages/guides/custom-server
- https://github.com/IBMa/equal-access/blob/3744f476005a460843c1dc55af4df9cf63c38326/accessibility-checker/boilerplates/batch-scan/main.js
- https://github.com/IBMa/equal-access/tree/3744f476005a460843c1dc55af4df9cf63c38326/accessibility-checker/boilerplates/jest
- https://github.com/IBMa/equal-access/wiki#baseline-basics
*/

/** root dir of the repo */
// WARNING: **must** be relative for achecker, they don't handle absolute baseline paths right
const REPO_ROOT = '.'; // process.cwd();
/** root dir for nextjs */ // (currently same as repo root)
const NEXT_PROJECT_ROOT = REPO_ROOT;
/** nextjs src directory */ // (currently in /src subdir rather than top-level)
const NEXT_SRC = path.join(NEXT_PROJECT_ROOT, 'src');
const ACHECKER_FILES_ROOT = path.join(REPO_ROOT, 'achecker');
const ACHECKER_OUTPUTS_DIR = path.join(ACHECKER_FILES_ROOT, 'output');
const ACHECKER_BASELINES_DIR = path.join(ACHECKER_FILES_ROOT, 'baselines');

function urlToLabel(url: URL): string {
  const trimmed = url.pathname.replace(/^\//, '');
  if (trimmed.length === 0) return 'index';
  return encodeURIComponent(trimmed);
}

async function main() {
  await using disposer = new AsyncDisposableStack();

  disposer.defer(achecker.close);

  // set up nextjs server
  const app = next({ dev: false, dir: NEXT_PROJECT_ROOT });
  disposer.defer(async () => await app.close());
  await app.prepare();
  const server = createServer(app.getRequestHandler());
  disposer.defer(promisify(server.close.bind(server)));
  server.listen();
  await new Promise<void>((resolve) => server.once('listening', () => resolve()));

  // get the server's url
  const address = server.address();
  if (typeof address === 'string' || address === null) throw new Error(); // FIXME just use an assert
  const baseUrl = new URL(
    `http://${address.family === 'IPv6' ? `[${address.address}]` : address.address}:${address.port}`
  );
  console.debug(`serving on ${baseUrl}`);

  const routes = getNextRoutes(NEXT_SRC);

  // WARNING: DO NOT set `cacheFolder` in the config here. you will crash achecker. i don't feel like figuring out why
  await achecker.setConfig({
    outputFolder: ACHECKER_OUTPUTS_DIR,
    baselineFolder: ACHECKER_BASELINES_DIR,
    // @ts-expect-error: eRuleLevel isn't exported so we can't do this properly. but these are the correct values
    failLevels: ['violation', 'potentialviolation', 'recommendation', 'potentialrecommendation', 'review'],
    outputFilenameTimestamp: true,
    outputFormat: ['json', 'html'],
  });

  for (const route of routes) {
    await using disposer = new AsyncDisposableStack();

    const url = new URL(route, baseUrl);
    const label = urlToLabel(url);
    console.group(label);
    disposer.defer(() => {
      console.groupEnd();
    });

    const results = await achecker.getCompliance(url.toString(), label);
    const report = results.report;
    if ('details' in report) {
      throw report.details;
    } // TODO handle this (report is achecker.ICheckerError) correctly

    const compliance = achecker.assertCompliance(report);
    console.log(achecker.eAssertResult[compliance]);
    if (compliance !== achecker.eAssertResult.PASS) {
      // console.error(achecker.stringifyResults(report));
      console.log(
        `find report at ${['html', 'json'].map((ext) => path.join(ACHECKER_OUTPUTS_DIR, `${label}.${ext}`)).join(' or ')}`
      );
      const baseline = achecker.getBaseline(label);
      if (baseline === null) console.warn('no baseline.');
      else {
        const diff = achecker.diffResultsWithExpected(report, baseline, true);
        const diffPath = path.join(ACHECKER_OUTPUTS_DIR, `${label}.diff.json`);
        fs.writeFile(diffPath, JSON.stringify(diff, undefined, '  '));
        console.warn(`baseline was present. find report<->baseline diff at ${diffPath}`);
      }
    }
  }
}

await main();
