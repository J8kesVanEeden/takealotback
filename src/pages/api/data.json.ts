import type { APIRoute } from 'astro';
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
} from '../../data/content';

// Public read-only JSON API of every structured content entity on the site.
// Useful for third-party tools, LLM agents, and anyone wanting machine-
// readable access to the SA consumer-rights reference. Same content
// licence as the rest of the site (CC BY 4.0). Same source of truth as
// the rendered HTML — content.ts.

export const GET: APIRoute = () => {
  const payload = {
    meta: {
      site: 'https://takealotback.com',
      last_reviewed: LAST_REVIEWED,
      takealot_policy_reviewed_against: TAKEALOT_POLICY_REVIEWED_AGAINST,
      licence: 'CC BY 4.0',
      licence_url: `${GITHUB_REPO_URL}/blob/main/CONTENT-LICENSE.md`,
      source_repo: GITHUB_REPO_URL,
      api_endpoint: 'https://takealotback.com/api/data.json',
      generated_at: new Date().toISOString(),
      schema_version: 1,
    },
    counts: {
      clauses: CLAUSES.length,
      templates: TEMPLATES.length,
      quick_hits: QUICK_HITS.length,
      law_sections: LAW_SECTIONS.length,
      escalation_tiers: ESCALATION.length,
      faq: FAQ.length,
      warranty_angles: WARRANTY_ANGLES.length,
      playbook: PLAYBOOK.length,
    },
    clauses: CLAUSES,
    templates: TEMPLATES,
    quick_hits: QUICK_HITS,
    law_sections: LAW_SECTIONS,
    escalation: ESCALATION,
    faq: FAQ,
    warranty_angles: WARRANTY_ANGLES,
    playbook: PLAYBOOK,
    policy_summary: POLICY_SUMMARY,
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Cache-Control': 'public, max-age=3600',
      'X-Licence': 'CC BY 4.0',
      'X-Source': 'https://github.com/J8kesVanEeden/takealotback',
    },
  });
};

export const OPTIONS: APIRoute = () =>
  new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
