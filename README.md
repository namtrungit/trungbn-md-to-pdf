# md2pdf

Convert Markdown files into cleanly typeset PDFs. Rendering runs through headless
Chrome (Puppeteer), so the output matches what you would get from a browser's
print dialog: real font shaping, syntax highlighting, working page breaks, and
proper handling of tables and images.

## Features

- **GitHub-flavoured Markdown** — tables, task lists, footnotes, autolinks, and
  attribute syntax.
- **Syntax highlighting** for 190+ languages via highlight.js, colour-matched to
  the active theme.
- **Two built-in themes** — `github` (clean and familiar) and `academic` (serif,
  justified) — plus `--css` for your own stylesheets.
- **Print-aware layout** — code blocks and tables never split across pages,
  headings never end up orphaned at the bottom of one, and
  `<!-- pagebreak -->` forces a new page wherever you want it.
- **Front matter** for per-document title, header, and theme overrides.
- **Batch conversion** of directories and globs, sharing one browser instance.
- **Watch mode** that rebuilds on save.
- **Table of contents** generated from your headings.

## Requirements

- Node.js 18 or newer.
- The first `npm install` downloads a private Chromium build (~150 MB) for
  Puppeteer.

## Installation

```bash
git clone <your-repo-url> md-to-pdf
cd md-to-pdf
npm install

# optional: make `md2pdf` available everywhere
npm link
```

## Usage

```bash
# single file -> notes.pdf next to the source
md2pdf notes.md

# explicit output path
md2pdf notes.md -o build/notes.pdf

# a whole directory into one output folder
md2pdf docs/ --out-dir build/pdf

# glob patterns work too
md2pdf "docs/**/*.md" -d build/pdf

# a polished report
md2pdf report.md --theme academic --toc --page-numbers --margin "25mm 20mm"

# rebuild on every save
md2pdf slides.md --watch
```

Without installing globally, run it through npm:

```bash
node src/cli.js notes.md
npm start -- notes.md --toc
```

## Options

| Option | Default | Description |
| --- | --- | --- |
| `-o, --output <file>` | — | Output path; only valid with a single input |
| `-d, --out-dir <dir>` | alongside source | Directory to write PDFs into |
| `-t, --theme <name>` | `github` | `github` or `academic` |
| `--format <size>` | `A4` | Any Chrome page size: `A3`, `A4`, `A5`, `Letter`, `Legal`, `Tabloid` |
| `--margin <margin>` | `20mm` | CSS shorthand: `"20mm"`, `"20mm 15mm"`, `"25mm 20mm 25mm 20mm"` |
| `--landscape` | off | Landscape orientation |
| `--scale <number>` | `1` | Render scale, `0.1`–`2` |
| `--no-print-background` | — | Drop background colours and images (saves ink) |
| `--toc` | off | Prepend a table of contents |
| `--toc-depth <number>` | `3` | Deepest heading level in the table of contents |
| `--page-numbers` | off | Print `page / total` in the footer |
| `--pages <ranges>` | all | Keep only these pages, e.g. `1-3` or `2,5` |
| `--header <text>` | — | Text printed at the top of every page |
| `--title <text>` | front matter or `# H1` | PDF document title |
| `--css <file...>` | — | Extra stylesheets, applied after the theme |
| `--keep-html` | off | Also write the intermediate HTML next to the PDF |
| `-w, --watch` | off | Rebuild whenever a source file changes |
| `-q, --quiet` | off | Only print errors |

## Front matter

An optional YAML block at the top of a file overrides settings per document:

```markdown
---
title: Quarterly Report
theme: academic
header: Acme Inc. — Confidential
---

# Quarterly Report
```

## Page breaks

Insert a break anywhere with an HTML comment:

```markdown
<!-- pagebreak -->
```

`<!-- newpage -->` and `<!-- page-break -->` do the same thing.

## Custom styling

Themes are plain CSS. Pass one or more stylesheets to layer on top of the
built-in theme:

```bash
md2pdf report.md --css branding.css
```

```css
/* branding.css */
body {
  font-family: 'Inter', sans-serif;
}

h1 {
  color: #b4232c;
}
```

To start from scratch, copy `assets/themes/github.css` and edit it.

One caveat worth knowing: Chrome only paints backgrounds inside the page's
content area, and it cannot paint the margins of continuation pages at all.
Full-page background colours therefore leave white bands on every page after the
first, which is why there is no built-in dark theme. Tinted *elements* — code
blocks, tables, callouts — print fine.

## Programmatic API

```javascript
import { MarkdownToPdf, convertFiles } from 'md-to-pdf-cli';

// one-shot helper: converts, then closes the browser
await convertFiles(['docs/guide.md', 'docs/api.md'], {
  outDir: 'build/pdf',
  theme: 'academic',
  toc: true,
});

// or keep a browser alive across many conversions
const converter = new MarkdownToPdf({ theme: 'academic', pageNumbers: true });
await converter.convertFile('README.md', 'build/readme.pdf');
await converter.convert('# From a string\n\nHello.', { output: 'build/inline.pdf' });
await converter.close();
```

`renderMarkdown(source, options)` and `buildHtmlDocument(options)` are also
exported if you only need the HTML.

## Project layout

```
src/
  cli.js        Command-line interface, input expansion, watch mode
  pdf.js        Browser lifecycle and PDF generation
  markdown.js   Markdown -> HTML, front matter, headings, table of contents
  html.js       Standalone HTML document assembly and theme loading
assets/
  base.css      Structural and print styles shared by all themes
  themes/       github.css, academic.css
examples/
  sample.md     Feature tour, useful as a visual check
```

## Troubleshooting

**Chromium fails to download during install.** Point Puppeteer at an existing
Chrome instead:

```bash
export PUPPETEER_SKIP_DOWNLOAD=true
export PUPPETEER_EXECUTABLE_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
```

**Images do not appear.** Relative paths resolve against the Markdown file's
directory. Check the path from that location, and note that remote images
require network access at conversion time.

**Backgrounds are missing.** Chrome omits them when `--no-print-background` is
set; drop the flag to keep them. Page-wide backgrounds are limited as described
under [Custom styling](#custom-styling).

## License

MIT
