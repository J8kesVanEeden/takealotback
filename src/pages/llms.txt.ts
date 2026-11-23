import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import {
  CLAUSES,
  TEMPLATES,
  QUICK_HITS,
  LAW_SECTIONS,
  ESCALATION,
  FAQ,
  WARRANTY_ANGLES,
  PLAYBOOK,
  LAST_REVIEWED,
  TAKEALOT_POLICY_REVIEWED_AGAINST,
  GITHUB_REPO_URL,
  SCOPE_LAW,
  SCOPE_TEMPLATES,
} from '../data/content';
import { CITATION_GROUPS, sortDeepDives, isoDate } from '../lib/site-index';
import { SITE_URL } from '../lib/schema';

// llms.txt (https://llmstxt.org): the map of the site for language models.
// Generated at build time so every count, date, clause, template, deep-dive
// page and citation comes from the same data the pages are built from.
// It used to be a hand-written file in public/ and fell behind the site.
// scripts/check-machine-readable.mjs checks every link in the output
// resolves to a built page or anchor, and that every homepage section,
// deep-dive page and citation is listed.

// Homepage sections in page order. Each `id` must be a <section id> on the
// homepage; the check fails if a section is added to the page and not here.
const SECTIONS: Array<{ id: string; name: string; about: string }> = [
  { id: 'home', name: 'Home', about: "What the site is for, with the jurisdiction, the laws it draws on and the counts below." },
  { id: 'short-version', name: `The short version: ${QUICK_HITS.length} quick hits`, about: 'One screen of the rights people use least, chargebacks included.' },
  { id: 'three-things', name: 'Three things to do right now', about: 'Find your fight (browse the clauses), grab a template, escalate.' },
  { id: 'dismantled', name: `Dismantled: ${CLAUSES.length} clauses`, about: "Clauses from Takealot's returns policy and terms, each set against the CPA, ECT Act and POPIA, with case law and who has to prove what." },
  { id: 'templates', name: `Templates: ${TEMPLATES.length} ready-to-send emails`, about: 'Copy-and-paste emails, each built on a specific section of the CPA, ECT Act or POPIA.' },
  { id: 'law', name: 'The law: full reference', about: `Section cards for ${LAW_SECTIONS.map((g) => g.group).join(', ')}, plus where to file.` },
  { id: 'warranties', name: 'Warranties: manufacturer vs CPA', about: `${WARRANTY_ANGLES.length} angles on the three layers of warranty (retailer, manufacturer, common law) and a playbook by scenario (${PLAYBOOK.map((p) => p.letter).join('/')}).` },
  { id: 'escalate', name: `Escalate: ${ESCALATION.length}-tier ladder`, about: `${ESCALATION.map((t) => `${t.tier}. ${t.title}`).join('; ')}.` },
  { id: 'policies', name: 'Their policies, summarised', about: "Takealot's returns policy and terms in plain English, with the official URLs." },
  { id: 'about', name: 'About', about: 'Why the site starts with Takealot and why the rights apply at other retailers too; its legal footing (s 16 Constitution, Trade Marks Act s 34(1)(c) read with Laugh It Off, UDRP, fair comment), its non-commercial commitments and the privacy note.' },
  { id: 'faq', name: `FAQ: ${FAQ.length} questions`, about: 'Every question and answer is also in llms-full.txt.' },
];

export const GET: APIRoute = async () => {
  const pages = sortDeepDives(await getCollection('pages'));
  const citations = await getCollection('citations');
  const reviewed = isoDate(LAST_REVIEWED);
  const policyDate = isoDate(TAKEALOT_POLICY_REVIEWED_AGAINST.replace(/^as live on /, ''));

  const out: string[] = [];
  const line = (s = '') => out.push(s);

  line('# TakealotBack.com');
  line();
  line("> A non-commercial, plain-English reference to South African consumer rights, built around Takealot. It sets Takealot's published returns policy against the Consumer Protection Act (CPA), the Electronic Communications and Transactions Act (ECT Act), POPIA and the common law, and gives the statute citations, case law, email templates and escalation ladder to go with it.");
  line();
  line(`Why Takealot: it's South Africa's biggest online retailer, so the site started there. The rights come from South African law, not from Takealot. ${SCOPE_LAW} ${SCOPE_TEMPLATES}`);
  line();
  line(`This site is a one-way reference. No contact form, no accounts, no user-submitted content, no ads. Page views are counted with Cloudflare Web Analytics (no cookies) and with Google Analytics 4 run through Cloudflare Zaraz (sets cookies); see the [privacy note](${SITE_URL}/#privacy). Content is licensed CC BY 4.0, so credit the site, link to the licence, say if you changed anything, and link to the canonical URL where you can. Code is MIT.`);
  line();
  line(`Content was last reviewed on ${reviewed} against published South African statutes, regulations and case law, and against Takealot's policies as live on ${policyDate}. The current review date is always in the \`last_reviewed\` field of ${SITE_URL}/api/data.json.`);
  line();

  line('## Homepage sections (single-page reference)');
  line();
  for (const s of SECTIONS) line(`- [${s.name}](${SITE_URL}/#${s.id}): ${s.about}`);
  line();

  line('## Deep-dive pages');
  line();
  for (const p of pages) line(`- [${p.data.title}](${SITE_URL}/${p.slug}): ${p.data.description}`);
  line();

  line('## Clauses');
  line();
  for (const c of CLAUSES) line(`- [Clause ${c.n}: ${c.title}](${SITE_URL}/#clause-${c.slug})`);
  line();

  line('## Email templates');
  line();
  for (const t of TEMPLATES) line(`- [${t.code}: ${t.title}](${SITE_URL}/#template-${t.code}): ${t.scenario}`);
  line();

  line('## Source of truth and updates');
  line();
  line(`- [Full content as plain markdown](${SITE_URL}/llms-full.txt): every quick hit, clause, template, law card, warranty angle, escalation tier, FAQ answer and deep-dive page in one file.`);
  line(`- [Citations & sources index](${SITE_URL}/citations): all ${citations.length} sources the site relies on (statutes, case law, CGSO and NCC advisory notes, Takealot policy snapshots, regulator details, commentary, press reports, service provider terms), dated, attributed, with primary URLs and Wayback Machine links where available.`);
  line(`- [Structured JSON API](${SITE_URL}/api/data.json): machine-readable export of every clause, template, quick hit, law-section card, escalation tier, FAQ entry, warranty angle, playbook scenario and policy-summary bullet. CC BY 4.0; CORS-open; rebuilt on every deploy.`);
  line(`- [RSS feed](${SITE_URL}/rss.xml): every deep-dive page and every citation page. Each citation entry's title carries its formal citation where it has one.`);
  line(`- [GitHub repository](${GITHUB_REPO_URL}): public; corrections via issues only.`);
  line(`- [Operations runbook](${GITHUB_REPO_URL}/blob/main/OPERATIONS.md): what triggers an update (Takealot policy changes, new case law, regulator changes). Useful for checking whether a snapshot is still current.`);
  line(`- [Content licence (CC BY 4.0)](${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md)`);
  line(`- [Code licence (MIT)](${GITHUB_REPO_URL}/blob/main/LICENSE)`);
  line();

  line('## What the site is not');
  line();
  line('- Not legal advice. Not a substitute for an attorney or the Consumer Goods and Services Ombud.');
  line('- Not affiliated with Takealot Online (RF) (Pty) Ltd or Naspers.');
  line('- Not a complaints directory. No user submissions are accepted or published.');
  line('- Not anti-Takealot. Most returns are handled correctly; the site is for the minority that aren\'t.');
  line();

  // "Optional" is the llms.txt convention for links a model can skip when
  // context is short.
  line('## Optional');
  line();
  line('Every citation page, by group.');
  line();
  for (const g of CITATION_GROUPS) {
    const entries = citations
      .filter((e) => e.slug.split('/')[0] === g.name)
      .sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
    for (const e of entries) {
      line(`- [${g.label}: ${e.data.title}](${SITE_URL}/citations/${e.slug})${e.data.citation ? `: ${e.data.citation}` : ''}`);
    }
  }

  return new Response(out.join('\n') + '\n', {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
