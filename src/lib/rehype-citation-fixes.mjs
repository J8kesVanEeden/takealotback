// Rehype plugin: post-process citation markdown HTML for accessibility.
//
// Two fixes:
//   1. Remove the first <h1> from the rendered tree. Citation source files
//      open with `# Title`, but the page template (`pages/citations/[...slug].astro`)
//      already renders an authoritative <h1>. Two h1s on one page is an
//      a11y violation.
//   2. Generate heading ids ourselves so we can guarantee they begin with
//      a letter. Astro's default rehype-slug runs *after* user rehype
//      plugins and skips headings that already have an id, so by setting
//      the id pre-emptively we lock in a `valid-id`-compliant slug. We
//      reuse github-slugger (the library Astro/rehype-slug both use) and
//      prefix with `h-` when the slug starts with a digit.
//
// Plugin must be registered as a [factory, options] tuple in Astro config —
// a bare factory reference is silently dropped by Astro's rehypePlugins
// option in v5.

import GithubSlugger from 'github-slugger';

export function rehypeCitationFixes() {
  return function transformer(tree) {
    removeFirstH1(tree);
    const slugger = new GithubSlugger();
    walk(tree, (node) => {
      if (node.type === 'element' && /^h[1-6]$/.test(node.tagName)) {
        node.properties = node.properties || {};
        if (!node.properties.id) {
          let slug = slugger.slug(textContent(node));
          if (/^[0-9]/.test(slug)) slug = 'h-' + slug;
          node.properties.id = slug;
        } else if (typeof node.properties.id === 'string' && /^[0-9]/.test(node.properties.id)) {
          node.properties.id = 'h-' + node.properties.id;
        }
      }
    });
  };
}

function removeFirstH1(tree) {
  const stack = [tree];
  while (stack.length) {
    const node = stack.shift();
    if (Array.isArray(node.children)) {
      const idx = node.children.findIndex(
        (c) => c && c.type === 'element' && c.tagName === 'h1'
      );
      if (idx !== -1) {
        // Also remove the trailing whitespace text node (and any leading
        // whitespace text node) so we don't leave a stray "  \n" behind
        // that html-validate would flag as trailing whitespace.
        let from = idx;
        let to = idx + 1;
        if (
          from > 0 &&
          node.children[from - 1] &&
          node.children[from - 1].type === 'text' &&
          /^\s*$/.test(node.children[from - 1].value || '')
        ) {
          from -= 1;
        }
        if (
          to < node.children.length &&
          node.children[to] &&
          node.children[to].type === 'text' &&
          /^\s*$/.test(node.children[to].value || '')
        ) {
          to += 1;
        }
        node.children.splice(from, to - from);
        return true;
      }
      for (const c of node.children) stack.push(c);
    }
  }
  return false;
}

function textContent(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value || '';
  if (Array.isArray(node.children)) {
    return node.children.map(textContent).join('');
  }
  return '';
}

function walk(node, fn) {
  if (!node || typeof node !== 'object') return;
  fn(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, fn);
  }
}
