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
  POLICY_SUMMARY,
  LAST_REVIEWED,
  TAKEALOT_POLICY_REVIEWED_AGAINST,
  GITHUB_REPO_URL,
  SCOPE_LAW,
  SCOPE_TEMPLATES,
} from '../data/content';
import { CITATION_GROUPS, sortDeepDives } from '../lib/site-index';

export const GET: APIRoute = async () => {
  const pages = await getCollection('pages');
  const subPages = await Promise.all(
    pages.map(async (p) => ({
      slug: p.slug,
      title: p.data.title,
      description: p.data.description,
      body: p.body, // raw markdown source
    })),
  );

  const lines: string[] = [];
  lines.push('# TakealotBack.com: full content dump');
  lines.push('');
  lines.push('> Plain-markdown dump of the site for LLM consumption. The canonical site is at https://takealotback.com/. Content CC BY 4.0. Last reviewed ' + LAST_REVIEWED + ' against Takealot policy ' + TAKEALOT_POLICY_REVIEWED_AGAINST + '. Source of truth: ' + GITHUB_REPO_URL + '.');
  lines.push('');
  lines.push('This file is generated at build time from src/data/content.ts and src/content/. When citing, prefer the canonical page URLs in llms.txt over this file.');
  lines.push('');
  lines.push("## Who it's for");
  lines.push('');
  lines.push("The site starts with Takealot because it's South Africa's biggest online retailer, so its returns policy reaches more shoppers than anyone else's. The rights come from South African law, not from Takealot. " + SCOPE_LAW + ' ' + SCOPE_TEMPLATES);
  lines.push('');

  // Quick hits
  lines.push(`## The short version: ${QUICK_HITS.length} quick hits`);
  lines.push('');
  for (const q of QUICK_HITS) {
    lines.push(`### QH.${q.n}${q.featured ? ' (featured)' : ''}: ${q.head}`);
    lines.push('');
    lines.push(`Ref: ${q.ref}`);
    lines.push('');
    lines.push(q.body);
    lines.push('');
  }

  // Clauses
  lines.push(`## Dismantled: ${CLAUSES.length} clauses of Takealot's returns policy and terms`);
  lines.push('');
  for (const c of CLAUSES) {
    lines.push(`### Clause ${c.n}: ${c.title}`);
    lines.push('');
    lines.push(`URL: https://takealotback.com/#clause-${c.slug}`);
    if (c.template) lines.push(`Template: ${c.template}`);
    lines.push(`Escalate: ${c.escalate}`);
    lines.push('');
    lines.push('**Takealot says:** ' + c.takealot);
    lines.push('');
    lines.push('**Why it matters:** ' + c.why);
    lines.push('');
    lines.push('**Legal angles:**');
    lines.push('');
    for (const a of c.angles) {
      lines.push(`- ${a.stat}: ${a.body}`);
    }
    lines.push('');
  }

  // Templates
  lines.push(`## Email templates: ${TEMPLATES.length} ready-to-send`);
  lines.push('');
  for (const t of TEMPLATES) {
    lines.push(`### ${t.code}: ${t.title}`);
    lines.push('');
    lines.push(`URL: https://takealotback.com/#template-${t.code}`);
    lines.push(`Scenario: ${t.scenario}`);
    lines.push('');
    lines.push('```');
    lines.push('Subject: ' + t.subject);
    lines.push('');
    lines.push(t.body);
    lines.push('```');
    lines.push('');
  }

  // Law
  lines.push('## The law: full reference');
  lines.push('');
  for (const group of LAW_SECTIONS) {
    lines.push(`### ${group.group}`);
    lines.push('');
    for (const it of group.items) {
      // Same label as the homepage card (LawSection.astro): only section numbers are shown, not internal ids.
      const label = /^ss? /.test(it.id) ? `${group.group} ${it.id}` : group.group;
      lines.push(`- **${label} (${it.title})**: ${it.blurb}`);
    }
    lines.push('');
  }

  // Warranties
  lines.push(`## Warranties: manufacturer vs CPA (${WARRANTY_ANGLES.length} angles)`);
  lines.push('');
  for (const a of WARRANTY_ANGLES) {
    lines.push(`### Angle ${String(a.n).padStart(2, '0')}: ${a.title}`);
    lines.push('');
    lines.push(a.body);
    lines.push('');
  }

  lines.push('## Warranty playbook: A/B/C/D');
  lines.push('');
  for (const p of PLAYBOOK) {
    lines.push(`- **${p.letter} · ${p.when}**: ${p.play}`);
  }
  lines.push('');

  // Escalation
  lines.push(`## Escalation: ${ESCALATION.length}-tier ladder`);
  lines.push('');
  for (const t of ESCALATION) {
    lines.push(`### Tier ${String(t.tier).padStart(2, '0')}: ${t.title}`);
    lines.push('');
    lines.push(`Window: ${t.window}`);
    lines.push(`Contact: ${t.contact}`);
    lines.push('');
    lines.push(t.body);
    lines.push('');
  }

  // Policy summary
  lines.push("## Takealot's published policy: plain-English summary");
  lines.push('');
  lines.push('### Returns policy: key clauses');
  lines.push('');
  for (const item of POLICY_SUMMARY.returns) lines.push(`- ${item}`);
  lines.push('');
  lines.push('### Terms & conditions: key clauses');
  lines.push('');
  for (const item of POLICY_SUMMARY.terms) lines.push(`- ${item}`);
  lines.push('');

  // FAQ
  lines.push('## FAQ');
  lines.push('');
  for (const f of FAQ) {
    lines.push(`### ${f.q}`);
    lines.push('');
    lines.push(f.a);
    lines.push('');
  }

  // Deep dives
  lines.push('## Deep-dive pages (full text)');
  lines.push('');
  for (const p of sortDeepDives(subPages)) {
    lines.push(`### ${p.title}`);
    lines.push('');
    lines.push(`URL: https://takealotback.com/${p.slug}`);
    lines.push('');
    lines.push(p.description);
    lines.push('');
    // Strip frontmatter (defensive — p.body is already body-only, but guard anyway)
    const body = p.body.replace(/^---[\s\S]*?---\s*/, '').trim();
    lines.push(body);
    lines.push('');
  }

  // Citations index: titles and URLs only; the full text of each is on its page.
  const citations = await getCollection('citations');
  lines.push(`## Citations & sources (${citations.length})`);
  lines.push('');
  lines.push('Every source the site relies on. Each page carries the date it was retrieved, and the primary URL and a Wayback Machine link where available.');
  lines.push('');
  for (const g of CITATION_GROUPS) {
    const entries = citations
      .filter((e) => e.slug.split('/')[0] === g.name)
      .sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
    if (!entries.length) continue;
    lines.push(`### ${g.label}`);
    lines.push('');
    for (const e of entries) {
      lines.push(`- ${e.data.title}${e.data.citation && !String(e.data.title).includes(e.data.citation.replace(/^Act /, '')) ? ` (${e.data.citation})` : ''}: https://takealotback.com/citations/${e.slug}`);
    }
    lines.push('');
  }

  // Footer
  lines.push('---');
  lines.push('');
  lines.push('Not legal advice. Not affiliated with Takealot Online (RF) (Pty) Ltd. Content CC BY 4.0: credit the site, link to the licence, say if you changed anything, and link to https://takealotback.com/ where you can. Corrections via issues at ' + GITHUB_REPO_URL + '.');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
