import MarkdownIt from 'markdown-it';
import anchor from 'markdown-it-anchor';
import attrs from 'markdown-it-attrs';
import footnote from 'markdown-it-footnote';
import taskLists from 'markdown-it-task-lists';
import hljs from 'highlight.js';
import matter from 'gray-matter';

function highlight(code, language) {
  if (language && hljs.getLanguage(language)) {
    try {
      return hljs.highlight(code, { language, ignoreIllegals: true }).value;
    } catch {
      // fall through to the escaped-plain-text rendering below
    }
  }
  return '';
}

function createRenderer() {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: false,
    highlight(code, language) {
      const highlighted = highlight(code, language);
      const body = highlighted || md.utils.escapeHtml(code);
      const languageClass = language ? ` language-${md.utils.escapeHtml(language)}` : '';
      return `<pre class="hljs${languageClass}"><code>${body}</code></pre>`;
    },
  });

  md.use(attrs)
    .use(footnote)
    .use(taskLists, { label: true })
    .use(anchor, { permalink: false, tabIndex: false });

  return md;
}

const renderer = createRenderer();

/**
 * A `<!-- pagebreak -->` (or `<!-- newpage -->`) comment forces a new PDF page.
 */
function applyPageBreaks(html) {
  return html.replace(/<!--\s*(?:pagebreak|newpage|page-break)\s*-->/gi, '<div class="page-break"></div>');
}

function collectHeadings(tokens) {
  const headings = [];
  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    if (token.type !== 'heading_open') continue;
    const level = Number(token.tag.slice(1));
    const inline = tokens[i + 1];
    headings.push({
      level,
      id: token.attrGet('id') ?? '',
      text: inline?.content ?? '',
    });
  }
  return headings;
}

function renderToc(headings, { maxLevel = 3 } = {}) {
  const items = headings.filter((heading) => heading.level >= 2 && heading.level <= maxLevel);
  if (items.length === 0) return '';

  const rows = items
    .map(
      (heading) =>
        `<li class="toc-level-${heading.level}"><a href="#${heading.id}">${renderer.utils.escapeHtml(
          heading.text,
        )}</a></li>`,
    )
    .join('\n');

  return `<nav class="toc"><h2 class="toc-title">Table of contents</h2><ul>\n${rows}\n</ul></nav>`;
}

/**
 * Keeps the document title first by placing the contents block just after the
 * leading `<h1>`, when the document opens with one.
 */
function insertToc(body, toc, tokens) {
  if (!toc) return body;

  const opensWithH1 = tokens[0]?.type === 'heading_open' && tokens[0].tag === 'h1';
  if (!opensWithH1) return `${toc}\n${body}`;

  const match = body.match(/<\/h1>/i);
  if (!match) return `${toc}\n${body}`;

  const splitAt = match.index + match[0].length;
  return `${body.slice(0, splitAt)}\n${toc}\n${body.slice(splitAt)}`;
}

/**
 * Parses a Markdown document into HTML plus the metadata needed to build a PDF.
 *
 * @param {string} source Raw Markdown, optionally prefixed with YAML front matter.
 * @param {{ toc?: boolean, tocDepth?: number }} [options]
 */
export function renderMarkdown(source, options = {}) {
  const { data: frontmatter, content } = matter(source);
  const env = {};
  const tokens = renderer.parse(content, env);
  const headings = collectHeadings(tokens);
  const body = applyPageBreaks(renderer.renderer.render(tokens, renderer.options, env));

  const toc = options.toc ? renderToc(headings, { maxLevel: options.tocDepth }) : '';
  const title =
    frontmatter.title ?? headings.find((heading) => heading.level === 1)?.text ?? undefined;

  return { html: insertToc(body, toc, tokens), frontmatter, headings, title };
}
