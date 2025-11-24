const HEADING_REGEX = /^(#{1,6})\s+(.*)$/;
const LIST_ITEM_REGEX = /^\s*[-*+]\s+(.*)$/;
const BLOCKQUOTE_REGEX = /^>\s?(.*)$/;
const CODE_BLOCK_REGEX = /^```/;

const INLINE_RULES: Array<[RegExp, (...args: string[]) => string]> = [
  [/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, url) => `<img src="${sanitizeUrl(url)}" alt="${alt}" />`],
  [/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text, url) => `<a href="${sanitizeUrl(url)}" target="_blank" rel="noopener noreferrer">${text}</a>`],
  [/`([^`]+?)`/g, (_match, code) => `<code>${code}</code>`],
  [/\*\*([^*]+)\*\*/g, (_match, text) => `<strong>${text}</strong>`],
  [/__([^_]+)__/g, (_match, text) => `<strong>${text}</strong>`],
  [/\*([^*]+)\*/g, (_match, text) => `<em>${text}</em>`],
  [/_([^_]+)_/g, (_match, text) => `<em>${text}</em>`],
  [/~~([^~]+)~~/g, (_match, text) => `<del>${text}</del>`]
];

function sanitizeUrl(rawUrl: string) {
  const trimmed = rawUrl.trim();
  if (/^(https?:|mailto:)/i.test(trimmed)) {
    return trimmed;
  }
  return "#";
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function applyInlineRules(text: string) {
  let result = text;
  for (const [regex, replacer] of INLINE_RULES) {
    result = result.replace(regex, replacer as (...args: any[]) => string);
  }
  return result;
}

export function markdownToHtml(markdown: string) {
  const escaped = escapeHtml(markdown ?? "");
  const lines = escaped.replace(/\r\n/g, "\n").split("\n");
  const htmlParts: string[] = [];
  let listItems: string[] = [];
  let paragraphLines: string[] = [];
  let inCodeBlock = false;
  const codeLines: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      htmlParts.push(`<ul>${listItems.join("")}</ul>`);
      listItems = [];
    }
  };

  const flushParagraph = () => {
    if (paragraphLines.length > 0) {
      const content = paragraphLines.map((line) => applyInlineRules(line)).join("<br />");
      htmlParts.push(`<p>${content}</p>`);
      paragraphLines = [];
    }
  };

  const flushCodeBlock = () => {
    if (codeLines.length > 0) {
      htmlParts.push(`<pre><code>${codeLines.join("\n")}</code></pre>`);
      codeLines.length = 0;
    }
  };

  for (const rawLine of lines) {
    if (CODE_BLOCK_REGEX.test(rawLine)) {
      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        flushParagraph();
        flushList();
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(rawLine);
      continue;
    }

    if (rawLine.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const headingMatch = rawLine.match(HEADING_REGEX);
    if (headingMatch) {
      const level = Math.min(6, headingMatch[1].length);
      const content = applyInlineRules(headingMatch[2]);
      flushParagraph();
      flushList();
      htmlParts.push(`<h${level}>${content}</h${level}>`);
      continue;
    }

    const blockquoteMatch = rawLine.match(BLOCKQUOTE_REGEX);
    if (blockquoteMatch) {
      flushParagraph();
      flushList();
      htmlParts.push(`<blockquote>${applyInlineRules(blockquoteMatch[1])}</blockquote>`);
      continue;
    }

    const listMatch = rawLine.match(LIST_ITEM_REGEX);
    if (listMatch) {
      flushParagraph();
      listItems.push(`<li>${applyInlineRules(listMatch[1])}</li>`);
      continue;
    }

    paragraphLines.push(rawLine);
  }

  flushParagraph();
  flushList();
  if (inCodeBlock) {
    flushCodeBlock();
  }

  return htmlParts.join("\n");
}
