// Remark plugin: rewrite relative `.md` links in markdown content so they
// resolve correctly on the live site.
//
// Source files in src/content/citations/<subfolder>/ cross-reference each
// other with relative paths like `[X](../cases/Motus-Wentzel-ZASCA-40-2021.md)`.
// That format works on GitHub (which auto-resolves the .md file). On the
// live Astro-rendered site, those links 404 because:
//   1. URLs don't carry the .md extension (Astro slugs are extension-less);
//   2. Astro lowercases content-collection slugs, so the case differs.
//
// This plugin walks every markdown link node, and for any relative href
// ending in .md (with optional #anchor), strips the extension and
// lowercases the path component. Anchors are preserved. External links
// (https://, http://, mailto:) are left alone.
//
// Wired in via astro.config.mjs → markdown.remarkPlugins.

export function remarkCitationMdLinks() {
  return function transformer(tree) {
    walk(tree);
  };
}

function walk(node) {
  if (!node || typeof node !== 'object') return;
  if (node.type === 'link' && typeof node.url === 'string') {
    node.url = rewrite(node.url);
  }
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child);
  }
}

function rewrite(url) {
  // Skip external schemes
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  // Skip pure anchors (in-page only)
  if (url.startsWith('#')) return url;
  // Only touch URLs that end with .md or .md#anchor
  const m = url.match(/^(.*?\.md)(#.*)?$/i);
  if (!m) return url;
  const pathPart = m[1].replace(/\.md$/i, '');
  const anchor = m[2] ?? '';
  // Lowercase the path part so the URL matches Astro's slug format
  return pathPart.toLowerCase() + anchor;
}
