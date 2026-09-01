---
title: md2pdf Feature Tour
header: md2pdf — sample document
---

# md2pdf Feature Tour

This document exercises every feature of the converter, so it doubles as a visual
regression check. Render it with:

```bash
md2pdf examples/sample.md --toc --page-numbers -o examples/out/sample.pdf
```

## Front matter

The YAML block at the top of this file sets the PDF title and the running header.
Front matter can also override the theme:

```yaml
---
title: Quarterly Report
theme: academic
header: Acme Inc. — Confidential
---
```

## Text formatting

Regular paragraphs support **bold**, *italic*, ~~strikethrough~~, `inline code`,
[links](https://example.com), and typographic niceties such as "smart quotes",
em dashes -- like this -- and ellipses...

> Block quotes are styled per theme and keep their spacing when they break
> across a page boundary.

## Lists

1. Ordered items
2. With nested content
   - Unordered child
   - Another child
3. Back to the top level

- [x] Task lists are supported
- [ ] Unchecked items render as empty boxes
- [ ] Useful for checklists in printed handouts

## Code blocks

Syntax highlighting comes from highlight.js and matches the active theme.

```javascript
import { MarkdownToPdf } from 'md-to-pdf-cli';

const converter = new MarkdownToPdf({ theme: 'academic', pageNumbers: true });
await converter.convertFile('README.md', 'out/readme.pdf');
await converter.close();
```

```python
def fib(n: int) -> int:
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
```

Code blocks never split across pages, and long lines wrap instead of being clipped.

## Tables

| Option           | Default    | Description                                |
| ---------------- | ---------- | ------------------------------------------ |
| `--theme`        | `github`   | Either `github` or `academic`              |
| `--format`       | `A4`       | Any Chrome page size, e.g. `Letter`, `A3`  |
| `--margin`       | `20mm`     | CSS shorthand, e.g. `"25mm 18mm"`          |
| `--page-numbers` | off        | Prints `page / total` in the footer        |

<!-- pagebreak -->

## Manual page breaks

The HTML comment `<!-- pagebreak -->` forces a new page, which is why this
section starts at the top of a fresh sheet.

## Images

Relative image paths resolve against the Markdown file's directory, so local
screenshots work without any extra configuration:

```markdown
![Architecture diagram](./diagrams/architecture.png)
```

## Footnotes

Footnotes[^1] are collected at the end of the document.

[^1]: Provided by `markdown-it-footnote`.

## Math and diagrams

Math and Mermaid diagrams are not rendered natively. Pre-render them to images,
or pass a custom stylesheet and inline HTML if you need something specific.
