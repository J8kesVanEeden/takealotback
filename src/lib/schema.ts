// JSON-LD builders — single source of truth for all structured data
// emitted across the site.
//
// Why this module exists: schema used to be inlined in four files
// (Layout.astro, [slug].astro, citations/[slug].astro, citations/index.astro).
// Adding a new schema type meant editing all four; a slip in one would
// drift silently. Now every page imports the same builders and the
// schema definitions live next to each other so consistency is the
// default.
//
// All builders return plain objects suitable for passing to JsonLd.astro,
// which handles the safe `<script type="application/ld+json">` wrapping.

import { GITHUB_REPO_URL, LAST_REVIEWED } from '../data/content';
import type { Template } from '../data/content';

// ── Stable IDs ──────────────────────────────────────────────────────────
// Schema.org @ids that get referenced by name from multiple places.
// Keeping them constants makes "find every place we link to the
// Organization" trivial and stops typos.
export const SITE_URL = 'https://takealotback.com';
export const ORG_ID = 'https://www.milkmoonstudio.com/#organization';
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_ID = `${SITE_URL}/#logo`;
export const OG_IMAGE_ID = `${SITE_URL}/#og-image`;
export const CITATIONS_PAGE_ID = `${SITE_URL}/citations#page`;

// ── Topic entities ──────────────────────────────────────────────────────
// Used in `Article.about` to disambiguate which legal instruments the
// content is about. `sameAs` to Wikipedia gives Google's Knowledge Graph
// a strong signal for entity linking — better topical authority signal
// than a free-form string.
//
// Add new entries when the site starts citing a new statute substantively.
export const TOPICS = {
  cpa: {
    '@type': 'Thing',
    name: 'Consumer Protection Act 68 of 2008',
    sameAs: 'https://en.wikipedia.org/wiki/Consumer_Protection_Act,_2008',
  },
  ect: {
    '@type': 'Thing',
    name: 'Electronic Communications and Transactions Act 25 of 2002',
    sameAs: 'https://en.wikipedia.org/wiki/Electronic_Communications_and_Transactions_Act,_2002',
  },
  popia: {
    '@type': 'Thing',
    name: 'Protection of Personal Information Act 4 of 2013',
    sameAs: 'https://en.wikipedia.org/wiki/Protection_of_Personal_Information_Act,_2013',
  },
  tma: {
    '@type': 'Thing',
    name: 'Trade Marks Act 194 of 1993',
    sameAs: 'https://en.wikipedia.org/wiki/Trade_Marks_Act,_1993',
  },
  constitution: {
    '@type': 'Thing',
    name: 'Constitution of South Africa, 1996',
    sameAs: 'https://en.wikipedia.org/wiki/Constitution_of_South_Africa',
  },
  prescription: {
    '@type': 'Thing',
    name: 'Prescription Act 68 of 1969',
    sameAs: 'https://en.wikipedia.org/wiki/Prescription_Act,_1969_(South_Africa)',
  },
} as const;

// All site content discusses CPA; adjust per-page for narrower scope.
export const ALL_TOPICS = Object.values(TOPICS);

// ── ImageObject + Logo ──────────────────────────────────────────────────

export function buildLogo() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': LOGO_ID,
    url: `${SITE_URL}/logo.png`,
    contentUrl: `${SITE_URL}/logo.png`,
    width: 512,
    height: 512,
    caption: 'TakealotBack.com — South African consumer rights, dismantled',
  };
}

export function buildOgImage() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    '@id': OG_IMAGE_ID,
    url: `${SITE_URL}/og-image.png`,
    contentUrl: `${SITE_URL}/og-image.png`,
    width: 1200,
    height: 630,
    caption: 'TakealotBack.com — TAKE A LOT BACK. South African consumer rights, dismantled.',
  };
}

// ── Organization + WebSite ──────────────────────────────────────────────

export function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Milk Moon Studio',
    url: 'https://www.milkmoonstudio.com/',
    email: 'mailto:jakes@milkmoonstudio.com',
    // Logo points to the dedicated 512×512 brand mark (public/logo.png),
    // sized for Google rich-card publisher logo eligibility.
    logo: { '@id': LOGO_ID },
  };
}

export function buildWebSite() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: 'TakealotBack.com',
    alternateName: 'TakealotBack',
    description:
      "A non-commercial, plain-English South African consumer-rights reference for disputes with Takealot. Maps their returns policy against the CPA, ECT Act, POPIA, and common law.",
    inLanguage: 'en-ZA',
    publisher: { '@id': ORG_ID },
    license: `${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md`,
    copyrightYear: 2026,
    isAccessibleForFree: true,
    creativeWorkStatus: 'Published',
  };
}

// ── BreadcrumbList ──────────────────────────────────────────────────────

interface Crumb {
  name: string;
  url: string;
}

export function buildBreadcrumb(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: c.url,
    })),
  };
}

// ── FAQPage (homepage) ──────────────────────────────────────────────────
// SpeakableSpecification marks the answer text as voice-readable. Voice
// assistants (Google Assistant, Alexa skills) use the cssSelector to pull
// the spoken response. Drops to a no-op for renderers that don't support
// it; harmless to include.

interface FaqItem { q: string; a: string; }

export function buildFaqPage(faq: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${SITE_URL}/#faq`,
    inLanguage: 'en-ZA',
    isPartOf: { '@id': WEBSITE_ID },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.tb-faq__body'],
    },
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

// ── CollectionPage (homepage) ───────────────────────────────────────────

interface ClauseLite { n: string; slug: string; title: string; }
interface TemplateLite { code: string; title: string; }

export function buildHomeCollectionPage(args: {
  clauses: ClauseLite[];
  templates: TemplateLite[];
}) {
  const { clauses, templates } = args;
  const isoReviewed = LAST_REVIEWED.replace(/\./g, '-');
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/#collection`,
    url: `${SITE_URL}/`,
    name: 'TakealotBack.com',
    description:
      "A single-page reference to South African consumer rights when Takealot's returns policy oversteps the CPA, ECT Act, or POPIA.",
    inLanguage: 'en-ZA',
    isPartOf: { '@id': WEBSITE_ID },
    dateModified: isoReviewed,
    datePublished: '2026-04-23',
    license: `${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md`,
    isAccessibleForFree: true,
    image: { '@id': OG_IMAGE_ID },
    publisher: { '@id': ORG_ID },
    // Quick-hits and FAQ-answer text are speakable for voice assistants.
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.tb-qh__body', '.tb-faq__body'],
    },
    about: ALL_TOPICS,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: clauses.length + templates.length,
      itemListElement: [
        ...clauses.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/#clause-${c.slug}`,
          name: `Clause ${c.n} — ${c.title}`,
        })),
        ...templates.map((t, i) => ({
          '@type': 'ListItem',
          position: clauses.length + i + 1,
          url: `${SITE_URL}/#template-${t.code}`,
          name: `Template ${t.code} — ${t.title}`,
        })),
      ],
    },
  };
}

// ── CollectionPage (citations index) ────────────────────────────────────

// Mirrors the local `Group` type in src/pages/citations/index.astro —
// `name` is the URL-safe slug ("cases", "statutes", ...), `label` is
// the human label, `entries` is whatever shape Astro's content
// collection returns. Using a structural type so we don't have to
// import CollectionEntry across the boundary.
interface CitationGroupLite {
  name: string;
  label: string;
  entries: Array<{ slug: string; data: { title: string } }>;
}

export function buildCitationsCollectionPage(args: {
  description: string;
  groups: CitationGroupLite[];
}) {
  const { description, groups } = args;
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': CITATIONS_PAGE_ID,
    url: `${SITE_URL}/citations`,
    name: 'Citations & sources — TakealotBack.com evidence vault',
    description,
    isPartOf: { '@id': WEBSITE_ID },
    inLanguage: 'en-ZA',
    about: 'South African consumer-rights primary sources',
    publisher: { '@id': ORG_ID },
    image: { '@id': OG_IMAGE_ID },
    hasPart: groups.flatMap((g) =>
      g.entries.map((e) => ({
        '@type': 'CreativeWork',
        name: e.data.title,
        url: `${SITE_URL}/citations/${e.slug}`,
        genre: g.label,
      })),
    ),
  };
}

// ── Article (deep-dives) ────────────────────────────────────────────────

export function buildDeepDiveArticle(args: {
  canonical: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
}) {
  const { canonical, title, description, datePublished, dateModified } = args;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${canonical}#article`,
    headline: title,
    description,
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: 'en-ZA',
    isAccessibleForFree: true,
    isPartOf: { '@id': WEBSITE_ID },
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    image: { '@id': OG_IMAGE_ID },
    license: `${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md`,
    dateModified,
    datePublished,
    about: ALL_TOPICS,
    keywords: [
      'Consumer Protection Act',
      'CPA',
      'Takealot',
      'South African consumer rights',
      'online retail returns',
      'ECT Act',
      'POPIA',
    ].join(', '),
  };
}

// ── Article (citation pages) ────────────────────────────────────────────
// schema.org has Legislation, LegalCaseDocument, and CreativeWork —
// using the right one nudges Google's Knowledge Graph and AEO toolchains
// to the correct surface.
export const CITATION_TYPES: Record<string, string> = {
  cases: 'LegalCaseDocument',
  statutes: 'Legislation',
  policies: 'CreativeWork',
  regulators: 'GovernmentService',
  advisories: 'Article',
  commentary: 'Article',
  press: 'NewsArticle',
};

// Per-group `about` topic — narrower than ALL_TOPICS, lets Google know
// what THIS specific citation page is principally about.
const GROUP_TOPIC: Record<string, Array<typeof TOPICS[keyof typeof TOPICS]>> = {
  cases: [TOPICS.cpa],
  statutes: [TOPICS.cpa, TOPICS.ect, TOPICS.popia],
  policies: [TOPICS.cpa],
  regulators: [TOPICS.cpa],
  advisories: [TOPICS.cpa],
  commentary: [TOPICS.cpa],
  press: [TOPICS.cpa],
};

export function buildCitationArticle(args: {
  group: string;          // "cases", "statutes", etc.
  canonical: string;
  data: Record<string, unknown>;
  description: string;
}) {
  const { group, canonical, data, description } = args;
  const type = CITATION_TYPES[group] ?? 'Article';
  const obj: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${canonical}#article`,
    headline: data.title,
    description: description.slice(0, 280),
    url: canonical,
    mainEntityOfPage: canonical,
    inLanguage: 'en-ZA',
    isAccessibleForFree: true,
    // Citation pages belong to the citations CollectionPage.
    isPartOf: { '@id': CITATIONS_PAGE_ID },
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    image: { '@id': OG_IMAGE_ID },
    dateModified:
      (data.retrieved as string)?.replace(/\./g, '-') ??
      LAST_REVIEWED.replace(/\./g, '-'),
    about: data.citation ? [...(GROUP_TOPIC[group] ?? []), {
      '@type': 'Thing',
      name: data.citation,
    }] : (GROUP_TOPIC[group] ?? []),
  };

  // Resolve datePublished from frontmatter `date:`. Three cases:
  //   1. Full ISO (YYYY-MM-DD) — use as-is.
  //   2. Year only (YYYY) — older judgments; synthesise YYYY-01-01.
  //   3. "undated" or anything else — drop the property.
  const raw = (data.date as string | undefined) ?? '';
  const full = raw.match(/\d{4}-\d{2}-\d{2}/)?.[0];
  const yearOnly = raw.match(/^\d{4}$/)?.[0];
  if (full) obj.datePublished = full;
  else if (yearOnly) obj.datePublished = `${yearOnly}-01-01`;

  return obj;
}

// ── HowTo (templates) ───────────────────────────────────────────────────
// Every email template is structurally a how-to: "how to email Takealot
// for [scenario]". Steps are: identify the order/issue, copy the subject,
// copy the body, send to Takealot's help address. Citations referenced
// inside the body get exposed as HowToTool entries — gives AEO
// extractors the legal grounding for the content.
//
// Wrapped in a single ItemList so the homepage emits one block instead
// of 16 separate <script> tags. AEO parsers (Bing, Perplexity, ChatGPT)
// handle ItemList-of-HowTo cleanly.

const TEMPLATE_HELP_EMAIL = 'help@takealot.com';

function extractTools(body: string): Array<{ '@type': 'HowToTool'; name: string }> {
  // Pull the most-specific legal-citation tools the body invokes.
  // Conservative: only match patterns that the citation-links resolver
  // already recognises, so we never list a tool we can't ground.
  const found = new Set<string>();
  const patterns: Array<[RegExp, string]> = [
    [/\bsection 5[0-9]\b/i, 'Section 5x of the Consumer Protection Act'],
    [/\bsection 19\b/i, 'Section 19 of the Consumer Protection Act'],
    [/\bsection 20\b/i, 'Section 20 of the Consumer Protection Act'],
    [/\bsection 22\b/i, 'Section 22 of the Consumer Protection Act'],
    [/\bsection 23\b/i, 'Section 23 of the Consumer Protection Act'],
    [/\bsection 41\b/i, 'Section 41 of the Consumer Protection Act'],
    [/\bsection 47\b/i, 'Section 47 of the Consumer Protection Act'],
    [/\bsection 51\b/i, 'Section 51 of the Consumer Protection Act'],
    [/\bsection 56\b/i, 'Section 56 of the Consumer Protection Act'],
    [/\bsection 69\b/i, 'Section 69 of the Consumer Protection Act'],
    [/\bsection 82\b/i, 'Section 82 of the Consumer Protection Act'],
    [/\bsection 4[2-6]\b/i, 'Section 4x of the Electronic Communications and Transactions Act'],
    [/\bPOPIA\b|Protection of Personal Information/i, 'Protection of Personal Information Act 4 of 2013'],
    [/\bConsumer Protection Act\b|\bCPA\b/i, 'Consumer Protection Act 68 of 2008'],
    [/\bRegulation 44\b|\bReg 44\b/i, 'Regulation 44 of the CPA Regulations 2011'],
    [/Consumer Goods (?:and|&) Services Ombud|CGSO/i, 'Consumer Goods and Services Ombud'],
  ];
  for (const [re, label] of patterns) {
    if (re.test(body)) found.add(label);
  }
  return [...found].map((name) => ({ '@type': 'HowToTool' as const, name }));
}

export function buildTemplateHowTo(t: Template) {
  const body = t.body.replace(/\s+/g, ' ').trim();
  return {
    '@type': 'HowTo',
    '@id': `${SITE_URL}/#howto-${t.code}`,
    name: `How to email Takealot: ${t.title}`,
    description: t.scenario,
    inLanguage: 'en-ZA',
    isAccessibleForFree: true,
    publisher: { '@id': ORG_ID },
    author: { '@id': ORG_ID },
    license: `${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md`,
    tool: extractTools(t.body),
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Identify the dispute',
        text: t.scenario,
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Use this subject line',
        text: t.subject,
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Send this body',
        text: body,
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Send to Takealot',
        text: `Address the email to ${TEMPLATE_HELP_EMAIL} from the same email account you used to place the order. Replace any [BRACKETED] placeholders with your specifics.`,
      },
    ],
  };
}

export function buildTemplatesHowToList(templates: Template[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/#templates-list`,
    name: 'Email templates for South African consumers in dispute with Takealot',
    description:
      `Sixteen ready-to-send email templates, each grounded in a specific section of the Consumer Protection Act, ECT Act, or POPIA. Copy, paste, send.`,
    numberOfItems: templates.length,
    isPartOf: { '@id': WEBSITE_ID },
    itemListElement: templates.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: buildTemplateHowTo(t),
    })),
  };
}
