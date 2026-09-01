#!/usr/bin/env node
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { Command, Option } from 'commander';
import { glob } from 'tinyglobby';

import { MarkdownToPdf } from './pdf.js';
import { THEMES } from './html.js';

const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));

const MARKDOWN_EXTENSIONS = new Set(['.md', '.markdown', '.mdown', '.mkd']);

function isMarkdown(filePath) {
  return MARKDOWN_EXTENSIONS.has(path.extname(filePath).toLowerCase());
}

async function expandInputs(patterns) {
  const files = new Set();

  for (const pattern of patterns) {
    let stats = null;
    try {
      stats = await stat(pattern);
    } catch {
      // Not a literal path, treat it as a glob below.
    }

    if (stats?.isFile()) {
      files.add(path.resolve(pattern));
      continue;
    }

    const searchPattern = stats?.isDirectory()
      ? path.join(pattern, '**/*.{md,markdown,mdown,mkd}')
      : pattern;

    for (const match of await glob(searchPattern, { absolute: true, ignore: ['**/node_modules/**'] })) {
      if (isMarkdown(match)) files.add(match);
    }
  }

  return [...files].sort();
}

function resolveOutputPath(input, { output, outDir }, totalInputs) {
  if (output && totalInputs === 1) return path.resolve(output);
  const name = `${path.basename(input, path.extname(input))}.pdf`;
  return outDir ? path.resolve(outDir, name) : path.join(path.dirname(input), name);
}

function formatDuration(startedAt) {
  return `${((performance.now() - startedAt) / 1000).toFixed(2)}s`;
}

function displayPath(filePath) {
  const relative = path.relative(process.cwd(), filePath);
  return relative.startsWith('..') ? filePath : relative;
}

const program = new Command()
  .name('md2pdf')
  .description('Convert Markdown files into styled PDFs using headless Chrome.')
  .version(packageJson.version)
  .argument('<inputs...>', 'Markdown files, directories, or glob patterns')
  .option('-o, --output <file>', 'output file path (only when converting a single input)')
  .option('-d, --out-dir <dir>', 'directory to write PDFs into (defaults to alongside each source)')
  .addOption(
    new Option('-t, --theme <name>', 'visual theme').choices(Object.keys(THEMES)).default('github'),
  )
  .option('--format <size>', 'page size, e.g. A4, Letter, Legal, A3', 'A4')
  .option('--margin <margin>', 'page margin, CSS shorthand, e.g. "20mm" or "20mm 15mm"', '20mm')
  .option('--landscape', 'use landscape orientation', false)
  .option('--scale <number>', 'render scale between 0.1 and 2', '1')
  .option('--no-print-background', 'omit background colours and images')
  .option('--toc', 'prepend a table of contents', false)
  .option('--toc-depth <number>', 'deepest heading level included in the table of contents', '3')
  .option('--page-numbers', 'print "page / total" in the footer', false)
  .option('--pages <ranges>', 'only keep these pages, e.g. "1-3" or "2,5"')
  .option('--header <text>', 'text printed at the top of every page')
  .option('--title <text>', 'PDF document title (defaults to front matter or first heading)')
  .option('--css <file...>', 'additional stylesheets applied after the theme')
  .option('--keep-html', 'also write the intermediate HTML next to the PDF', false)
  .option('-w, --watch', 'rebuild whenever a source file changes', false)
  .option('-q, --quiet', 'only print errors', false)
  .action(main);

async function main(patterns, options) {
  const files = await expandInputs(patterns);

  if (files.length === 0) {
    program.error(`No Markdown files matched: ${patterns.join(', ')}`);
  }

  if (options.output && files.length > 1) {
    program.error('--output expects a single input file; use --out-dir for multiple files.');
  }

  const log = options.quiet ? () => {} : (message) => console.log(message);

  const converter = new MarkdownToPdf({
    theme: options.theme,
    format: options.format,
    margin: options.margin,
    landscape: options.landscape,
    scale: Number(options.scale),
    printBackground: options.printBackground,
    toc: options.toc,
    tocDepth: Number(options.tocDepth),
    pageNumbers: options.pageNumbers,
    pageRanges: options.pages ?? '',
    headerText: options.header ?? '',
    title: options.title,
    stylesheets: options.css ?? [],
    keepHtml: options.keepHtml,
  });

  const convertOne = async (file) => {
    const startedAt = performance.now();
    const target = resolveOutputPath(file, options, files.length);
    try {
      const result = await converter.convertFile(file, target);
      log(`  ${displayPath(file)} -> ${displayPath(result.output)}  (${formatDuration(startedAt)})`);
      return true;
    } catch (error) {
      console.error(`  Failed: ${displayPath(file)}\n    ${error.message}`);
      return false;
    }
  };

  log(`Converting ${files.length} file${files.length === 1 ? '' : 's'}...`);
  const outcomes = [];
  for (const file of files) {
    outcomes.push(await convertOne(file));
  }

  const failures = outcomes.filter((ok) => !ok).length;
  if (!options.watch) {
    await converter.close();
    if (failures > 0) {
      process.exitCode = 1;
    }
    return;
  }

  const { watch } = await import('chokidar');
  const watcher = watch(files, { ignoreInitial: true });

  log(`\nWatching ${files.length} file${files.length === 1 ? '' : 's'} for changes. Press Ctrl+C to stop.`);
  watcher.on('change', async (file) => {
    log(`\nChange detected: ${displayPath(path.resolve(file))}`);
    await convertOne(path.resolve(file));
  });

  const shutdown = async () => {
    await watcher.close();
    await converter.close();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

await program.parseAsync(process.argv);
