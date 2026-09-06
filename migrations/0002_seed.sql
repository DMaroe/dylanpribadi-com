-- Seed content for dylanpribadi.com, sourced from Dylan's resume data bank.
-- Structure follows design/Portfolio.dc.html — the schema doesn't care what
-- the copy says, only that the shapes (three summaries per project, tag
-- on_card flags, skills.category) line up.

INSERT INTO profile (
  id, name, hero_eyebrow, hero_headline, hero_subhead, cta_heading, cta_note,
  availability, contact_intro, email, whatsapp_number, whatsapp_url, footer_note
) VALUES (
  1,
  'Dylan Pribadi',
  'Dylan Pribadi',
  'Ideas shipped,' || char(10) || 'not just pitched.',
  'Dual-degree CS/IT graduate who builds full-stack software solo and has led teams of 130+ to deliver under pressure.',
  'Got a project worth' || char(10) || 'building together?',
  'Replies within one working day.',
  'Open to work · Sept 2026',
  'Contract work, full-time roles, or a second opinion on a build — send it over. I read everything and reply within a working day.',
  'dylanpribadi@gmail.com',
  '+61 412 929 168',
  'https://wa.me/61412929168',
  'Built by hand · Melbourne, VIC'
);

INSERT INTO facts (label, value, sort_order) VALUES
  ('Currently', 'Full-stack dev' || char(10) || 'at DMaroe Software', 1),
  ('Based in',  'Melbourne, VIC' || char(10) || 'GMT+10', 2),
  ('Depth',     '2 CS/IT degrees' || char(10) || 'across 2 countries', 3),
  ('Open to',   'Contract work' || char(10) || 'and full-time', 4);

INSERT INTO projects (slug, title, role, year, home_summary, summary, modal_summary, detail, link_url, repo_url, featured, sort_order) VALUES
  (
    'aces-ai-kiosk', 'ACES AI Kiosk', 'Full-stack Engineer & Project Manager', '2025',
    'AI-assisted kiosk for phone trade-ins and warranty checks — planned, built, and project-managed end to end.',
    'Self-service kiosk that assesses a phone''s condition, gives a trade-in offer, and checks warranty status on the spot.',
    'Self-service kiosk that assesses a phone''s condition, gives a trade-in offer, and checks warranty status on the spot — built as both the sole full-stack engineer and the project manager.',
    'I planned the kiosk''s interface flow, built the full stack in React and Next.js, and ran the project reporting alongside a small team. The result was a working prototype that walks a customer from phone assessment through to a trade-in offer without staff involvement.',
    '#', '#', 1, 1
  ),
  (
    'rs-ummi-inventory', 'RS Ummi Internal Inventory & Procurement', 'Team Leader, Full-stack Developer & UI/UX Designer', '2024',
    'Internal inventory and procurement platform for a hospital, designed in Figma and built test-first.',
    'Internal inventory and procurement system built for a hospital''s operations team.',
    'Internal inventory and procurement system built for a hospital''s operations team — designed in Figma, developed test-first in Django.',
    'I led the team, designed the UI/UX in Figma, and built the backend in Python Django using test-driven development so the inventory logic held up under review before it shipped.',
    '#', '#', 1, 2
  ),
  (
    'posts-app-devops', 'Posts App DevOps', 'DevOps Engineer', '2025',
    'Terraform- and Ansible-orchestrated pipeline that keeps a social app scaling with its traffic.',
    'Infrastructure pipeline for a Twitter-like posting app, built to scale with fluctuating user load.',
    'Infrastructure pipeline for a Twitter-like posting app on AWS, built so it scales with fluctuating traffic instead of crashing or over-paying for idle capacity.',
    'I built and orchestrated the full deployment pipeline with Terraform and Ansible on AWS. Every deploy runs through GitHub Actions, the app is trackable in production, and it scales to handle traffic spikes without falling over.',
    '#', '#', 1, 3
  ),
  (
    'moodtracker', 'Moodtracker', 'Sole Developer', '2026',
    NULL,
    'Private daily-reflection app for couples in long-distance relationships, limited to one post a day.',
    'Private daily-reflection app for couples in long-distance relationships — one post a day, replies only between partners.',
    'Built solo on Cloudflare D1 and Workers. Each partner posts one reflection a day, similar to a tweet but private to the couple, so a long-distance relationship keeps a shared, low-effort thread of what each person''s day actually looked like.',
    '#', '#', 0, 4
  ),
  (
    'the-vault', 'The Vault', 'Sole Developer', '2026',
    NULL,
    'Turns raw business ideas into a list of executable next steps, processed by AI.',
    'Turns raw business ideas into a list of executable next steps, using AI to structure the thinking most ideas never get past.',
    'Built solo with React, TanStack, and Cloudflare D1/Workers. I have more business ideas than time to structure them properly, so this takes a raw idea through an AI pass and turns it into concrete, executable points instead of a note that never gets revisited.',
    '#', '#', 0, 5
  ),
  (
    'hoomgroom', 'HoomGroom', 'Java Developer', '2024',
    NULL,
    'Platform concept for booking on-demand house cleaning services.',
    'Platform concept for booking on-demand house cleaning services, planned end to end from business model to build.',
    'Planned the website and the business model behind it in Java with Bootstrap, aimed at people who don''t have time to clean their own home or apartment but want an easy way to book someone who can.',
    '#', '#', 0, 6
  );

INSERT INTO tags (name) VALUES
  ('React'), ('Next.js'), ('Jira'), ('Figma'),
  ('Python'), ('Django'), ('AWS'), ('Ansible'),
  ('Terraform'), ('TanStack'), ('Cloudflare'), ('SQL'),
  ('Java');

-- on_card = 0 means the tag shows in the detail modal but not on the card.
--
-- Written as one VALUES list of scalar subqueries rather than a chain of
-- `SELECT ... UNION ALL`: D1's SQLite has a low SQLITE_MAX_COMPOUND_SELECT and
-- rejects a 20-term compound select outright ("too many terms in compound
-- SELECT"). Don't "tidy" this back into a UNION chain.
INSERT INTO project_tags (project_id, tag_id, on_card, sort_order) VALUES
  ((SELECT id FROM projects WHERE slug = 'aces-ai-kiosk'),     (SELECT id FROM tags WHERE name = 'React'),      1, 1),
  ((SELECT id FROM projects WHERE slug = 'aces-ai-kiosk'),     (SELECT id FROM tags WHERE name = 'Next.js'),    1, 2),
  ((SELECT id FROM projects WHERE slug = 'aces-ai-kiosk'),     (SELECT id FROM tags WHERE name = 'Jira'),       1, 3),
  ((SELECT id FROM projects WHERE slug = 'rs-ummi-inventory'), (SELECT id FROM tags WHERE name = 'Figma'),      1, 1),
  ((SELECT id FROM projects WHERE slug = 'rs-ummi-inventory'), (SELECT id FROM tags WHERE name = 'Python'),     1, 2),
  ((SELECT id FROM projects WHERE slug = 'rs-ummi-inventory'), (SELECT id FROM tags WHERE name = 'Django'),     1, 3),
  ((SELECT id FROM projects WHERE slug = 'posts-app-devops'),  (SELECT id FROM tags WHERE name = 'AWS'),        1, 1),
  ((SELECT id FROM projects WHERE slug = 'posts-app-devops'),  (SELECT id FROM tags WHERE name = 'Ansible'),    1, 2),
  ((SELECT id FROM projects WHERE slug = 'posts-app-devops'),  (SELECT id FROM tags WHERE name = 'Terraform'),  1, 3),
  ((SELECT id FROM projects WHERE slug = 'moodtracker'),       (SELECT id FROM tags WHERE name = 'TanStack'),   1, 1),
  ((SELECT id FROM projects WHERE slug = 'moodtracker'),       (SELECT id FROM tags WHERE name = 'Cloudflare'), 1, 2),
  ((SELECT id FROM projects WHERE slug = 'moodtracker'),       (SELECT id FROM tags WHERE name = 'SQL'),        0, 3),
  ((SELECT id FROM projects WHERE slug = 'the-vault'),         (SELECT id FROM tags WHERE name = 'React'),      1, 1),
  ((SELECT id FROM projects WHERE slug = 'the-vault'),         (SELECT id FROM tags WHERE name = 'TanStack'),   1, 2),
  ((SELECT id FROM projects WHERE slug = 'the-vault'),         (SELECT id FROM tags WHERE name = 'Cloudflare'), 0, 3),
  ((SELECT id FROM projects WHERE slug = 'hoomgroom'),         (SELECT id FROM tags WHERE name = 'Java'),       1, 1);

INSERT INTO skills (name, category, body, sort_order) VALUES
  ('React',      'toolkit', NULL, 1),
  ('Next.js',    'toolkit', NULL, 2),
  ('Python',     'toolkit', NULL, 3),
  ('Django',     'toolkit', NULL, 4),
  ('AWS',        'toolkit', NULL, 5),
  ('Terraform',  'toolkit', NULL, 6),
  ('SQL',        'toolkit', NULL, 7),
  ('Figma',      'toolkit', NULL, 8),

  ('Jira',       'tool', NULL, 1),
  ('Notion',     'tool', NULL, 2),
  ('Figma',      'tool', NULL, 3),
  ('Cloudflare', 'tool', NULL, 4),
  ('Excel',      'tool', NULL, 5),
  ('PowerPoint', 'tool', NULL, 6),
  ('CI/CD',      'tool', NULL, 7),

  ('Cloud & DevOps Engineering', 'receipt',
   'Built and orchestrated a full Terraform + Ansible pipeline on AWS for a social posting app, so the infrastructure scales with traffic spikes instead of crashing or sitting over-provisioned. Every deploy runs through GitHub Actions and reports back into a trackable pipeline — no manual scaling decisions.', 1),
  ('Business Process Consulting', 'receipt',
   'At AgriAku, standardised critical processes across five departments — Logistics, Marketing, Technology, HR, and Strategy — and benchmarked our IT products against competitors to find where the feature gaps actually were. Turning research into an implementable process is the part I was hired for.', 2),
  ('AI-Based Process Automation', 'receipt',
   'Identified a manual, error-prone step in AgriAku''s operations and replaced it with an AI-based automation — the single highest-leverage thing I shipped there, because it removed a recurring task instead of just documenting it.', 3),
  ('Cross-Functional Team Leadership', 'receipt',
   'Led a 132-person team across 10 divisions — including web development, events, and cinematography — as Project Officer for Open House Fasilkom UI, and separately negotiated a content partnership with an external startup that had raised $5M in funding.', 4),
  ('Full-Stack Product Development', 'receipt',
   'Through DMaroe Software Solutions, I build and deploy full-stack applications — React, Next.js, and TanStack on the frontend, Cloudflare, Vercel, AWS, and Supabase for hosting and data — for businesses going through digital transformation.', 5),
  ('Event & Operations Leadership', 'receipt',
   'Revived Interweek after a 4-year COVID hiatus, leading a 35-person team across 4 divisions to attract 140+ participants and land a headline guest. Separately worked high-volume guest services at the F1 Australian Grand Prix and the Australian Open, both multi-day international events run at scale.', 6);

INSERT INTO experience (role, company, period, description, sort_order) VALUES
  ('Full-stack Developer & Consultant', 'DMaroe Software Solutions', '2024 — Now',
   'Build and deploy full-stack software — React, Next.js, TanStack — for businesses going through digital transformation, hosted on AWS, Cloudflare, Vercel, and Supabase.', 1),
  ('Strategy Management Intern', 'AgriAku', 'Nov 2023 — Feb 2024',
   'Standardised business processes across five departments, benchmarked competitor IT products, and shipped an AI-based automation for a manual workflow.', 2),
  ('Project Officer / President', 'Open House Fasilkom UI', 'Mar 2022 — Dec 2022',
   'Led a 132-person team across 10 divisions and negotiated a content partnership with a startup that had raised $5M in funding.', 3);

INSERT INTO social_links (label, url, sort_order) VALUES
  ('GitHub', '#', 1),
  ('LinkedIn', 'https://www.linkedin.com/in/dylanpribadi/', 2),
  ('Resume', '#', 3);
