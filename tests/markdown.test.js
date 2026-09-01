import assert from 'node:assert/strict';
import test from 'node:test';

import { renderMarkdown } from '../src/markdown.js';
import { buildHtmlDocument } from '../src/html.js';

test('extracts front matter and falls back to the first heading for the title', () => {
  const withFrontMatter = renderMarkdown('---\ntitle: From Front Matter\n---\n\n# Heading\n');
  assert.equal(withFrontMatter.title, 'From Front Matter');
  assert.equal(withFrontMatter.frontmatter.title, 'From Front Matter');

  const withoutFrontMatter = renderMarkdown('# Heading\n');
  assert.equal(withoutFrontMatter.title, 'Heading');
});

test('renders GitHub-flavoured constructs', () => {
  const { html } = renderMarkdown('| a | b |\n| - | - |\n| 1 | 2 |\n\n- [x] done\n');
  assert.match(html, /<table>/);
  assert.match(html, /type="checkbox"/);
});

test('highlights fenced code blocks', () => {
  const { html } = renderMarkdown('```javascript\nconst x = 1;\n```\n');
  assert.match(html, /class="hljs language-javascript"/);
  assert.match(html, /hljs-keyword/);
});

test('converts page break comments into break elements', () => {
  const { html } = renderMarkdown('a\n\n<!-- pagebreak -->\n\nb\n');
  assert.match(html, /<div class="page-break"><\/div>/);
});

test('builds a table of contents from headings when requested', () => {
  const source = '# Title\n\n## First\n\n### Nested\n\n#### Too deep\n';
  const { html } = renderMarkdown(source, { toc: true, tocDepth: 3 });
  assert.match(html, /class="toc"/);
  assert.match(html, /href="#first"/);
  assert.match(html, /href="#nested"/);
  assert.doesNotMatch(html, /href="#too-deep"/);
});

test('escapes HTML in the document title and inlines theme CSS', async () => {
  const document = await buildHtmlDocument({ body: '<p>hi</p>', title: '<script>x</script>' });
  assert.match(document, /<title>&lt;script&gt;/);
  assert.match(document, /class="markdown-body"/);
  assert.match(document, /hljs/);
});

test('rejects unknown themes', async () => {
  await assert.rejects(() => buildHtmlDocument({ body: '', theme: 'nope' }), /Unknown theme/);
});
