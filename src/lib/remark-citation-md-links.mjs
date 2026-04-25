// Remark plugin: rewrite relative `.md` links in citation markdown so
// they resolve correctly on the live site.
//
// Source files in src/content/citations/<subfolder>/ cross-reference each
// other with relative paths like:
//   [X](../cases/Motus-Wentzel-ZASCA-40-2021.md)
//   [Y](./Glaston-House-Inag-1977.md)
//   [Z](Phame-Paizes-1973.md)
//
// That format works on GitHub. On the live Astro-rendered site, the
// "leaf" URLs are extension-less and lowercase (e.g.
// /citations/cases/motus-wentzel-zasca-40-2021), with no trailing slash —
// which means browsers resolve a leading `./` against the URL's *parent*,
// producing wrong paths like
// /citations/cases/dibley-furter-1951/glaston-house-inag-1977.
//
// To avoid trailing-slash ambiguity entirely, we resolve every relative
// .md link to an absolute /citations/... URL using the source file's
// path on disk (provided by unified via the vfile argument).
//
// External links (https://, http://, mailto:) and pure anchors are
// untouched.
//
// Wired in via astro.config.mjs → markdown.remarkPlugins.

import path from 'node:path';

const CITATIONS_ROOT_FRAGMENT = path.join('src', 'content', 'citations') + path.sep;

export function remarkCitationMdLinks() {
  return function transformer(tree, file) {
    const filePath = (file && (file.path || file.history?.[file.history.length - 1])) || '';
    if (!filePath) return;
    const citationsRootIdx = filePath.indexOf(CITATIONS_ROOT_FRAGMENT);
    if (citationsRootIdx === -1) return;
    const dirInsideCitations = path.dirname(
      filePath.slice(citationsRootIdx + CITATIONS_ROOT_FRAGMENT.length)
    );
    walk(tree, (node) => {
      if (node.type === 'link' && typeof node.url === 'string') {
        node.url = rewrite(node.url, dirInsideCitations);
      }
    });
  };
}

function rewrite(url, dirInsideCitations) {
  // External schemes
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) return url;
  // Pure anchor
  if (url.startsWith('#')) return url;
  // Already absolute
  if (url.startsWith('/')) return url;
  // Only touch URLs that end with .md (optionally with anchor)
  const m = url.match(/^(.*?\.md)(#.*)?$/i);
  if (!m) return url;
  const relPath = m[1];
  const anchor = m[2] ?? '';
  // Resolve the relative path against the source file's directory,
  // strip the .md, lowercase, and prefix with /citations/.
  const joined = path.posix.join(
    dirInsideCitations.split(path.sep).join('/'),
    relPath
  );
  const withoutExt = joined.replace(/\.md$/i, '');
  return '/citations/' + withoutExt.toLowerCase() + anchor;
}

function walk(node, fn) {
  if (!node || typeof node !== 'object') return;
  fn(node);
  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child, fn);
  }
}
