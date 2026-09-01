import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const assetsDir = path.resolve(fileURLToPath(new URL('../assets', import.meta.url)));

export const THEMES = {
  github: { file: 'github.css', highlight: 'github.css' },
  academic: { file: 'academic.css', highlight: 'github.css' },
};

const cache = new Map();

async function readCached(filePath) {
  if (!cache.has(filePath)) {
    cache.set(filePath, readFile(filePath, 'utf8'));
  }
  return cache.get(filePath);
}

async function readHighlightTheme(name) {
  try {
    return await readCached(require.resolve(`highlight.js/styles/${name}`));
  } catch {
    return '';
  }
}

export function escapeHtml(value) {
  return String(value).replace(
    /[&<>"']/g,
    (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char],
  );
}

/**
 * Assembles a standalone HTML document ready for printing.
 *
 * @param {object} options
 * @param {string} options.body Rendered Markdown HTML.
 * @param {string} [options.title] Document title.
 * @param {string} [options.theme] Built-in theme name.
 * @param {string[]} [options.stylesheets] Paths to extra CSS files, applied last.
 * @param {string} [options.baseUrl] Base href so relative images resolve.
 */
export async function buildHtmlDocument({
  body,
  title = 'Document',
  theme = 'github',
  stylesheets = [],
  baseUrl,
}) {
  const selected = THEMES[theme];
  if (!selected) {
    throw new Error(`Unknown theme "${theme}". Available: ${Object.keys(THEMES).join(', ')}`);
  }

  const [base, themeCss, highlightCss, ...extraCss] = await Promise.all([
    readCached(path.join(assetsDir, 'base.css')),
    readCached(path.join(assetsDir, 'themes', selected.file)),
    readHighlightTheme(selected.highlight),
    ...stylesheets.map((sheet) => readFile(path.resolve(sheet), 'utf8')),
  ]);

  const css = [base, themeCss, highlightCss, ...extraCss].filter(Boolean).join('\n\n');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
${baseUrl ? `<base href="${escapeHtml(baseUrl)}">` : ''}
<title>${escapeHtml(title)}</title>
<style>
${css}
</style>
</head>
<body class="theme-${escapeHtml(theme)}">
<main class="markdown-body">
${body}
</main>
</body>
</html>`;
}
