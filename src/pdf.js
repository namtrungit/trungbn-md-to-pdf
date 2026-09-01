import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

import { buildHtmlDocument, escapeHtml } from './html.js';
import { renderMarkdown } from './markdown.js';

export const DEFAULT_OPTIONS = {
  theme: 'github',
  format: 'A4',
  margin: '20mm',
  landscape: false,
  scale: 1,
  printBackground: true,
  toc: false,
  tocDepth: 3,
  pageNumbers: false,
  headerText: '',
  pageRanges: '',
  title: undefined,
  stylesheets: [],
  keepHtml: false,
  timeout: 60_000,
};

function normalizeMargin(margin) {
  const parts = String(margin).trim().split(/\s+/);
  const [top, right = top, bottom = top, left = right] = parts;
  return { top, right, bottom, left };
}

function templateStyle(margin) {
  return (
    'font-size:8pt;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;' +
    `color:#8b949e;width:100%;text-align:center;padding:0 ${margin.right} 0 ${margin.left};`
  );
}

function buildTemplates({ headerText, pageNumbers, title, margin }) {
  const style = templateStyle(margin);

  const header = headerText
    ? `<div style="${style}">${escapeHtml(headerText === true ? title : headerText)}</div>`
    : '<div></div>';

  const footer = pageNumbers
    ? `<div style="${style}"><span class="pageNumber"></span> / <span class="totalPages"></span></div>`
    : '<div></div>';

  return { header, footer, enabled: Boolean(headerText || pageNumbers) };
}

/**
 * Converts Markdown to PDF. Reuses a single browser instance across files,
 * so call `close()` when finished.
 */
export class MarkdownToPdf {
  #browser = null;

  constructor(options = {}) {
    this.options = { ...DEFAULT_OPTIONS, ...options };
  }

  async launch() {
    if (!this.#browser) {
      this.#browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--font-render-hinting=none'],
      });
    }
    return this.#browser;
  }

  async close() {
    if (this.#browser) {
      await this.#browser.close();
      this.#browser = null;
    }
  }

  /**
   * @param {string} inputPath Path to a `.md` file.
   * @param {string} [outputPath] Defaults to the input path with a `.pdf` extension.
   * @returns {Promise<{ input: string, output: string, title: string }>}
   */
  async convertFile(inputPath, outputPath) {
    const absoluteInput = path.resolve(inputPath);
    const source = await readFile(absoluteInput, 'utf8');
    const target =
      outputPath ??
      path.join(path.dirname(absoluteInput), `${path.basename(absoluteInput, path.extname(absoluteInput))}.pdf`);

    return this.convert(source, {
      output: target,
      baseDir: path.dirname(absoluteInput),
      input: absoluteInput,
      fallbackTitle: path.basename(absoluteInput, path.extname(absoluteInput)),
    });
  }

  /**
   * @param {string} source Raw Markdown text.
   * @param {{ output: string, baseDir?: string, input?: string, fallbackTitle?: string }} params
   */
  async convert(source, { output, baseDir = process.cwd(), input, fallbackTitle = 'Document' }) {
    const options = this.options;
    const { html, frontmatter, title } = renderMarkdown(source, {
      toc: options.toc,
      tocDepth: options.tocDepth,
    });

    const documentTitle = options.title ?? title ?? fallbackTitle;
    const margin = normalizeMargin(options.margin);
    const theme = frontmatter.theme ?? options.theme;

    const outputPath = path.resolve(output);
    await mkdir(path.dirname(outputPath), { recursive: true });

    // Rendering from a real file in the source directory lets relative images,
    // stylesheets and links resolve exactly as they do in a Markdown preview.
    const scratchName = `.md2pdf-${process.pid}-${Date.now()}.html`;
    let htmlPath = options.keepHtml ? outputPath.replace(/\.pdf$/i, '.html') : path.join(baseDir, scratchName);
    let baseUrl;

    const write = async () =>
      writeFile(
        htmlPath,
        await buildHtmlDocument({
          body: html,
          title: documentTitle,
          theme,
          stylesheets: options.stylesheets,
          baseUrl,
        }),
        'utf8',
      );

    try {
      await write();
    } catch (error) {
      if (options.keepHtml) throw error;
      // Read-only source directory: render from a temp file and point relative
      // URLs back at the original location.
      baseUrl = `${pathToFileURL(baseDir).href}/`;
      htmlPath = path.join(os.tmpdir(), scratchName);
      await write();
    }

    const browser = await this.launch();
    const page = await browser.newPage();

    try {
      await page.emulateMediaType('print');
      await page.goto(pathToFileURL(htmlPath).href, {
        waitUntil: 'networkidle0',
        timeout: options.timeout,
      });
      await page.evaluate(async () => {
        await document.fonts?.ready;
      });

      const templates = buildTemplates({
        headerText: frontmatter.header ?? options.headerText,
        pageNumbers: options.pageNumbers,
        title: documentTitle,
        margin,
      });

      await page.pdf({
        path: outputPath,
        format: options.format,
        landscape: options.landscape,
        scale: Number(options.scale),
        printBackground: options.printBackground,
        margin,
        ...(options.pageRanges ? { pageRanges: options.pageRanges } : {}),
        displayHeaderFooter: templates.enabled,
        headerTemplate: templates.header,
        footerTemplate: templates.footer,
        timeout: options.timeout,
      });
    } finally {
      await page.close();
      if (!options.keepHtml) {
        await rm(htmlPath, { force: true });
      }
    }

    return { input, output: outputPath, html: options.keepHtml ? htmlPath : undefined, title: documentTitle };
  }
}

/**
 * One-shot helper: converts a list of Markdown files and shuts the browser down.
 *
 * @param {string[]} inputs
 * @param {{ outDir?: string, output?: string } & Partial<typeof DEFAULT_OPTIONS>} [options]
 */
export async function convertFiles(inputs, options = {}) {
  const { outDir, output, ...rest } = options;
  const converter = new MarkdownToPdf(rest);
  const results = [];

  try {
    for (const input of inputs) {
      const name = `${path.basename(input, path.extname(input))}.pdf`;
      const target =
        inputs.length === 1 && output
          ? output
          : outDir
            ? path.join(outDir, name)
            : undefined;
      results.push(await converter.convertFile(input, target));
    }
  } finally {
    await converter.close();
  }

  return results;
}
