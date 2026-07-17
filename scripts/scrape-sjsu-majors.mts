#!/usr/bin/env node

import { readFile, writeFile } from 'node:fs/promises';
import { basename } from 'node:path';
import { parseArgs, type ParseArgsConfig } from 'node:util';

const DEFAULT_URL = 'https://catalog.sjsu.edu/content.php?catoid=17&navoid=7689';
const DEFAULT_OUTPUT = 'src/app/(public)/membership/data/sjsuMajors.ts';

const UNDERGRAD_DEGREES = new Set(['BA', 'BFA', 'BM', 'BS']);
const GRADUATE_DEGREES = new Set(['MA', 'MBA', 'MFA', 'MLIS', 'MPA', 'MPH', 'MS', 'MSW', 'MUP']);
const DEGREE_PATTERN = new RegExp(`,\\s*(${[...UNDERGRAD_DEGREES, ...GRADUATE_DEGREES].join('|')})\\b`);
const EXCLUDED_PATTERN =
  /\b(minor|certificate|certification|credential|doctoral|doctorate|edd|dnp|phd|aud|not accepting students)\b/i;
const COMBINED_PROGRAM_PATTERN = /\b[A-Z]{2,5}\s*\+/;

function usage() {
  return `Usage: node scripts/${basename(process.argv[1])} [--url ${DEFAULT_URL}] [--input saved-catalog.html] [--output ${DEFAULT_OUTPUT}]

Scrapes SJSU undergraduate and master's-level degree-seeking majors from the Academic Programs catalog page.
Use --input with browser-saved HTML if catalog.sjsu.edu blocks automated fetches with AWS WAF.`;
}

const ARGSPEC = {
  allowNegative: true,
  allowPositionals: false,
  strict: true,
  options: {
    help: { type: 'boolean', short: 'h', default: false },
    url: {
      type: 'string',
      short: 'u',
      default: DEFAULT_URL,
    },
    input: { type: 'string' },
    output: { type: 'string', default: DEFAULT_OUTPUT },
  },
} as const satisfies ParseArgsConfig;

type Args = typeof args;
const args = parseArgs(ARGSPEC).values;

if (args.help) {
  usage();
  process.exit(1);
}

export interface SjsuMajor {
  label: string;
  value: string;
  level: 'undergraduate' | 'graduate';
}

function decodeHtml(value: string) {
  const named = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  };

  type NamedEntity = keyof typeof named;

  function isNamedEntity(value: string): value is NamedEntity {
    return value in named;
  }

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match: string, entity: string) => {
    const lower = entity.toLowerCase();

    if (lower.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    }

    if (lower.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    }

    return isNamedEntity(lower) ? named[lower] : match;
  });
}

function normalizeText(value: string) {
  return decodeHtml(value)
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/\s+,/g, ',')
    .trim();
}

function extractProgramNames(html: string) {
  const candidates = new Set<string>();
  const anchorPattern = /<a\b[^>]*href=["'][^"']*preview_program\.php[^"']*["'][^>]*>([\s\S]*?)<\/a>/gi;
  let match;

  while ((match = anchorPattern.exec(html)) !== null) {
    const text = normalizeText(match[1])
      .replace(/^Program:\s*/i, '')
      .replace(/\s+-\s+San Jos[eé] State University.*$/i, '')
      .trim();

    if (text) {
      candidates.add(text);
    }
  }

  return [...candidates];
}

function getLevel(programName: string) {
  const degree = programName.match(DEGREE_PATTERN)?.[1];

  if (!degree) {
    return undefined;
  }

  if (UNDERGRAD_DEGREES.has(degree)) {
    return 'undergraduate';
  }

  if (GRADUATE_DEGREES.has(degree)) {
    return 'graduate';
  }

  return undefined;
}

function canonicalizeProgramName(programName: string) {
  return programName
    .replace(/\s*\((?:SJSU Online|Accepting Students for Fall \d{4})\)/gi, '')
    .replace(/\s*\([^)]*\),\s*(MBA)\b/gi, ', $1')
    .replace(/,\s*.*\bConcentration\b[^,]*,\s*(BA|BFA|BM|BS|MA|MBA|MFA|MLIS|MPA|MPH|MS|MSW|MUP)\b/gi, ', $1')
    .replace(
      /,\s*(?:PK-3\s+)?Integrated Teacher Education Program(?:\s+Spanish Bilingual)?,\s*(BA|BFA|BM|BS)\b/gi,
      ', $1'
    )
    .replace(/,\s*Preparation for Teaching(?:\s+W\/CSET Waiver|\s*\([^)]*\))?,\s*(BA|BFA|BM|BS)\b/gi, ', $1')
    .replace(/\s+/g, ' ')
    .trim();
}

function filterMajors(programNames: string[]) {
  const majors = new Map<string, SjsuMajor>();

  for (const programName of programNames) {
    if (EXCLUDED_PATTERN.test(programName) || COMBINED_PROGRAM_PATTERN.test(programName)) {
      continue;
    }

    const label = canonicalizeProgramName(programName);
    const level = getLevel(label);

    if (!level) {
      continue;
    }

    majors.set(label, { label, value: label, level });
  }

  return [...majors.values()].sort((left, right) => left.label.localeCompare(right.label, 'en'));
}

function toFileString(majors: SjsuMajor[], source: string) {
  const generatedAt = new Date().toISOString();
  const rows = majors
    .map(
      (major) =>
        `  { label: ${JSON.stringify(major.label)}, value: ${JSON.stringify(major.label)}, level: '${major.level}' },`
    )
    .join('\n');

  return `// Generated by scripts/scrape-sjsu-majors.mts. Do not edit by hand.\n// Source: ${source}\n// Generated at: ${generatedAt}\n\nexport interface SjsuMajor {\n  label: string;\n  value: string;\n  level: 'undergraduate' | 'graduate';\n}\n\nexport const sjsuMajors: SjsuMajor[] = [\n${rows}\n];\n`;
}

async function readHtml(args: Args) {
  if (args.input) {
    return {
      html: await readFile(args.input, 'utf8'),
      source: args.input,
    };
  }

  const response = await fetch(args.url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (compatible; rcc-site-major-scraper/1.0)',
    },
  });

  const html = await response.text();

  if (!response.ok) {
    throw new Error(`Fetch failed with ${response.status} ${response.statusText}`);
  }

  if (
    html.includes('AwsWafIntegration') ||
    html.includes('challenge-container') ||
    (response.status === 202 && response.headers.has('x-amzn-waf-action'))
  ) {
    throw new Error(
      'SJSU catalog returned an AWS WAF challenge. Save the catalog page HTML in a browser and rerun with --input.'
    );
  }

  return { html, source: args.url };
}

const { html, source } = await readHtml(args);
const majors = filterMajors(extractProgramNames(html));

if (majors.length === 0) {
  throw new Error(
    'No undergraduate or graduate majors were found. Check that the input is the Academic Programs catalog page HTML.'
  );
}

await writeFile(args.output, toFileString(majors, source));
console.log(`Wrote ${majors.length} majors to ${args.output}`);
