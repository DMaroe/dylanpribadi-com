-- Seed content lifted verbatim from design/Portfolio.dc.html, so a freshly
-- migrated database renders the site exactly as the design does. Replace this
-- with real content when you're ready — the schema doesn't care.

INSERT INTO profile (
  id, name, hero_eyebrow, hero_headline, hero_subhead, cta_heading, cta_note,
  availability, contact_intro, email, whatsapp_number, whatsapp_url, footer_note
) VALUES (
  1,
  'Jordan Reyes',
  'Jordan Reyes',
  'Interfaces with teeth.' || char(10) || 'Shipped, not framed.',
  'Six years turning messy product ideas into software people actually finish using.',
  'Got a project worth' || char(10) || 'stealing time for?',
  'Replies within one working day.',
  'Open to work · Sept 2026',
  'Contract work, full-time roles, or a second opinion on a gnarly interface — send it over. I read everything and reply within a working day.',
  'hello@jordanreyes.dev',
  '+63 900 000 0000',
  'https://wa.me/000000000',
  'Built by hand · Manila, PH'
);

INSERT INTO facts (label, value, sort_order) VALUES
  ('Currently', 'Senior frontend' || char(10) || 'at Northlight', 1),
  ('Based in',  'Manila, PH' || char(10) || 'GMT+8', 2),
  ('Depth',     '6 years' || char(10) || '4 product teams', 3),
  ('Open to',   'Contract work' || char(10) || 'and full-time', 4);

INSERT INTO projects (slug, title, role, year, home_summary, summary, modal_summary, detail, link_url, repo_url, featured, sort_order) VALUES
  (
    'velvet-ledger', 'Velvet Ledger', 'Full-stack Developer', '2024',
    'Personal-finance dashboard with real-time category forecasting for 12k monthly users.',
    'Personal-finance dashboard with real-time category forecasting and shared household budgets.',
    'Personal-finance dashboard with real-time category forecasting and shared household budgets, used by about 12,000 people each month.',
    'I built the forecasting service (nightly jobs over two years of transaction history), the charting layer in D3, and the shared-budget permission model. The hard part was making projections feel trustworthy: every number links back to the transactions behind it. Launched in eleven weeks with one designer.',
    '#', '#', 1, 1
  ),
  (
    'nightcall', 'Nightcall', 'Lead Frontend Engineer', '2023',
    'Shift-swap tool for hospital staff. Cut scheduling admin time by roughly 40%.',
    'Shift-swap marketplace for hospital staff — approvals, audit trail, and fairness scoring.',
    'Shift-swap marketplace for hospital staff — requests, approvals, an audit trail, and a fairness score that stops the same people always covering nights.',
    'I led the frontend for three engineers and owned the schedule view, which had to stay usable on old tablets over hospital wifi. Replacing nested context providers with query-cache boundaries cut 210KB from the bundle and got first load under a second. Scheduling admin time dropped roughly 40% in the first quarter.',
    '#', '#', 1, 2
  ),
  (
    'kagemusha-cli', 'Kagemusha CLI', 'Maintainer · DevOps', '2022 — Now',
    'Open-source deploy runner. 1.4k stars, used in three production pipelines.',
    'Open-source deploy runner with reversible releases. 1.4k stars and counting.',
    'Open-source deploy runner with reversible releases. 1.4k stars and in use in three production pipelines I know of.',
    'Written in Go so it ships as one binary. Every deploy records a reversible plan, so rollback is a single command instead of a scramble. I review the issue queue weekly and have merged work from nineteen outside contributors.',
    '#', '#', 1, 3
  ),
  (
    'sable-type', 'Sable Type', 'Frontend Engineer', '2023',
    NULL,
    'Web tool for previewing variable fonts against real product copy. Used by two type foundries.',
    'Web tool for previewing variable fonts against real product copy, now used by two independent type foundries.',
    'Renders text through a WASM build of HarfBuzz to a canvas so axis changes stay smooth at 60fps. Includes a paste-your-own-copy mode, because foundry specimens never look like the interface you''re actually shipping.',
    '#', '#', 0, 4
  ),
  (
    'transit-ghost', 'Transit Ghost', 'Mobile Developer', '2022',
    NULL,
    'Offline-first commuter app with predicted arrivals from crowd-sourced pings.',
    'Offline-first commuter app that predicts jeepney and bus arrivals from crowd-sourced pings.',
    'Local SQLite is the source of truth, syncing when a connection appears — it has to work underground and in dead zones. Predictions come from a simple median-of-recent-pings model that beat the operator''s published timetable in my own two-week test.',
    '#', '#', 0, 5
  ),
  (
    'palette-heist', 'Palette Heist', 'Solo Developer', '2021',
    NULL,
    'Contrast-checking plugin that flags failing color pairs before handoff.',
    'Figma plugin that flags failing color pairs before a file gets handed to engineering.',
    'Walks the selected frames, resolves real composited colors through opacity and blend modes, and reports the WCAG ratio with a suggested nearest passing shade. Built after the third time I found contrast bugs at code-review instead of in design.',
    '#', '#', 0, 6
  );

INSERT INTO tags (name) VALUES
  ('React'), ('Postgres'), ('D3'), ('Node'),
  ('Next.js'), ('Prisma'), ('tRPC'), ('Playwright'),
  ('Go'), ('Docker'), ('CI/CD'), ('Terraform'),
  ('Svelte'), ('Canvas'), ('WASM'),
  ('React Native'), ('SQLite'), ('Offline-first'),
  ('TypeScript'), ('Figma API');

-- on_card = 0 means the tag shows in the detail modal but not on the card,
-- matching the design's card tag lists exactly.
--
-- Written as one VALUES list of scalar subqueries rather than a chain of
-- `SELECT ... UNION ALL`: D1's SQLite has a low SQLITE_MAX_COMPOUND_SELECT and
-- rejects a 20-term compound select outright ("too many terms in compound
-- SELECT"). Don't "tidy" this back into a UNION chain.
INSERT INTO project_tags (project_id, tag_id, on_card, sort_order) VALUES
  ((SELECT id FROM projects WHERE slug = 'velvet-ledger'), (SELECT id FROM tags WHERE name = 'React'),         1, 1),
  ((SELECT id FROM projects WHERE slug = 'velvet-ledger'), (SELECT id FROM tags WHERE name = 'Postgres'),      1, 2),
  ((SELECT id FROM projects WHERE slug = 'velvet-ledger'), (SELECT id FROM tags WHERE name = 'D3'),            1, 3),
  ((SELECT id FROM projects WHERE slug = 'velvet-ledger'), (SELECT id FROM tags WHERE name = 'Node'),          0, 4),
  ((SELECT id FROM projects WHERE slug = 'nightcall'),     (SELECT id FROM tags WHERE name = 'Next.js'),       1, 1),
  ((SELECT id FROM projects WHERE slug = 'nightcall'),     (SELECT id FROM tags WHERE name = 'Prisma'),        1, 2),
  ((SELECT id FROM projects WHERE slug = 'nightcall'),     (SELECT id FROM tags WHERE name = 'tRPC'),          1, 3),
  ((SELECT id FROM projects WHERE slug = 'nightcall'),     (SELECT id FROM tags WHERE name = 'Playwright'),    0, 4),
  ((SELECT id FROM projects WHERE slug = 'kagemusha-cli'), (SELECT id FROM tags WHERE name = 'Go'),            1, 1),
  ((SELECT id FROM projects WHERE slug = 'kagemusha-cli'), (SELECT id FROM tags WHERE name = 'Docker'),        1, 2),
  ((SELECT id FROM projects WHERE slug = 'kagemusha-cli'), (SELECT id FROM tags WHERE name = 'CI/CD'),         1, 3),
  ((SELECT id FROM projects WHERE slug = 'kagemusha-cli'), (SELECT id FROM tags WHERE name = 'Terraform'),     0, 4),
  ((SELECT id FROM projects WHERE slug = 'sable-type'),    (SELECT id FROM tags WHERE name = 'Svelte'),        1, 1),
  ((SELECT id FROM projects WHERE slug = 'sable-type'),    (SELECT id FROM tags WHERE name = 'Canvas'),        1, 2),
  ((SELECT id FROM projects WHERE slug = 'sable-type'),    (SELECT id FROM tags WHERE name = 'WASM'),          1, 3),
  ((SELECT id FROM projects WHERE slug = 'transit-ghost'), (SELECT id FROM tags WHERE name = 'React Native'),  1, 1),
  ((SELECT id FROM projects WHERE slug = 'transit-ghost'), (SELECT id FROM tags WHERE name = 'SQLite'),        1, 2),
  ((SELECT id FROM projects WHERE slug = 'transit-ghost'), (SELECT id FROM tags WHERE name = 'Offline-first'), 0, 3),
  ((SELECT id FROM projects WHERE slug = 'palette-heist'), (SELECT id FROM tags WHERE name = 'TypeScript'),    1, 1),
  ((SELECT id FROM projects WHERE slug = 'palette-heist'), (SELECT id FROM tags WHERE name = 'Figma API'),     1, 2);

INSERT INTO skills (name, category, body, sort_order) VALUES
  ('TypeScript',      'toolkit', NULL, 1),
  ('React',           'toolkit', NULL, 2),
  ('Design systems',  'toolkit', NULL, 3),
  ('Node',            'toolkit', NULL, 4),
  ('Go',              'toolkit', NULL, 5),
  ('Postgres',        'toolkit', NULL, 6),
  ('Accessibility',   'toolkit', NULL, 7),
  ('Figma',           'toolkit', NULL, 8),

  ('Docker',          'tool', NULL, 1),
  ('GitHub Actions',  'tool', NULL, 2),
  ('Terraform',       'tool', NULL, 3),
  ('Figma',           'tool', NULL, 4),
  ('Playwright',      'tool', NULL, 5),
  ('Vitest',          'tool', NULL, 6),
  ('Linear',          'tool', NULL, 7),

  ('Cloud Engineering — AWS', 'receipt',
   'Moved Northlight’s web tier from a single EC2 box to ECS Fargate behind CloudFront: infrastructure defined in Terraform, secrets in SSM, blue/green deploys. Cold-start incidents went from monthly to none, and the monthly bill dropped about 30% after right-sizing tasks and adding S3 lifecycle rules. I also run the on-call rotation for it.', 1),
  ('Frontend Architecture', 'receipt',
   'I own the structure of two production React codebases — routing, data-fetching boundaries, and where state is allowed to live. On Nightcall I replaced a tangle of context providers with query-cache boundaries, which cut the initial bundle by 210KB and made the schedule view load in under a second on hospital wifi.', 2),
  ('Design Systems', 'receipt',
   'Built and maintain the component library four squads ship on: 46 components, tokens generated from Figma variables, visual regression on every PR. Adoption is measurable — 82% of new screens use it untouched, and UI bug reports fell by roughly a third in the two quarters after launch.', 3),
  ('Leadership & Mentoring', 'receipt',
   'I led a three-person squad through the Cassia scheduling rewrite: I wrote the plan, split it so each person owned a vertical slice, and ran a 30-minute weekly review that ended with decisions rather than notes. We shipped a week early. Both juniors I mentored there now lead features of their own — that’s the part I’d point to.', 4),
  ('CI/CD & Release Engineering', 'receipt',
   'Set up the GitHub Actions pipeline the team deploys through: typed checks, Playwright suite on preview URLs, one-command rollback. Deploys went from a scheduled Thursday-night event to roughly nine a week, with change-failure rate under 5%.', 5),
  ('Accessibility', 'receipt',
   'Led the audit that took Cassia Health to WCAG 2.1 AA — keyboard paths, focus order, contrast, and screen-reader labels across 40 screens — then wrote the lint rules and checklist that keep it from regressing. I test with VoiceOver, not just automated tooling.', 6);

INSERT INTO experience (role, company, period, description, sort_order) VALUES
  ('Senior Frontend Engineer', 'Northlight', '2023 — Now',
   'Own the design-system layer used by four product squads. Shipped a token pipeline that cut UI bug reports by a third.', 1),
  ('Product Engineer', 'Cassia Health', '2021 — 2023',
   'Built scheduling and messaging features for clinical staff. Led the accessibility audit that got us to WCAG AA.', 2),
  ('Web Developer', 'Freelance', '2019 — 2021',
   'Nineteen sites for small studios and non-profits, from brief to deploy.', 3);

INSERT INTO social_links (label, url, sort_order) VALUES
  ('GitHub', '#', 1),
  ('LinkedIn', '#', 2),
  ('Read.cv', '#', 3);
