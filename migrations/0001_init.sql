-- Portfolio schema.
--
-- Shaped directly from design/Portfolio.dc.html. Two things in that design drive
-- decisions that look odd in isolation:
--
--  1. A project's blurb is written three times at three lengths — a tight one on
--     the home page card, a longer one on the projects page card, and a longer
--     one again in the detail modal. They are genuinely different copy, not
--     truncations, so they are three columns rather than one.
--  2. Cards show a subset of a project's tags (Transit Ghost has three tags but
--     its card shows two), so the join table carries an `on_card` flag instead
--     of the page slicing the list and hoping.

-- Single-row site identity. id is pinned to 1.
CREATE TABLE profile (
  id              INTEGER PRIMARY KEY CHECK (id = 1),
  name            TEXT NOT NULL,
  hero_eyebrow    TEXT NOT NULL,
  hero_headline   TEXT NOT NULL, -- newlines are rendered as line breaks
  hero_subhead    TEXT NOT NULL,
  cta_heading     TEXT NOT NULL, -- newlines are rendered as line breaks
  cta_note        TEXT NOT NULL,
  availability    TEXT NOT NULL, -- contact page eyebrow, e.g. "Open to work · Sept 2026"
  contact_intro   TEXT NOT NULL,
  email           TEXT NOT NULL,
  whatsapp_number TEXT,
  whatsapp_url    TEXT,
  footer_note     TEXT NOT NULL
);

-- The four-column "Currently / Based in / Depth / Open to" strip on the home page.
CREATE TABLE facts (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  label      TEXT NOT NULL,
  value      TEXT NOT NULL, -- newlines are rendered as line breaks
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE projects (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  role          TEXT NOT NULL,
  year          TEXT NOT NULL, -- free text: "2024", "2022 — Now"
  home_summary  TEXT,          -- home page card; falls back to summary
  summary       TEXT NOT NULL, -- projects page card
  modal_summary TEXT,          -- detail modal lede; falls back to summary
  detail        TEXT,          -- detail modal body
  link_url      TEXT,
  repo_url      TEXT,
  featured      INTEGER NOT NULL DEFAULT 0 CHECK (featured IN (0, 1)),
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE tags (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE
);

CREATE TABLE project_tags (
  project_id INTEGER NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tag_id     INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
  on_card    INTEGER NOT NULL DEFAULT 1 CHECK (on_card IN (0, 1)),
  sort_order INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (project_id, tag_id)
);

-- One table, three surfaces, distinguished by category:
--   'toolkit' -> home page "Toolkit." chips
--   'tool'    -> skills page "Tools" chips
--   'receipt' -> skills page "Skills, with receipts" cards (body is required)
CREATE TABLE skills (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  category   TEXT NOT NULL CHECK (category IN ('toolkit', 'tool', 'receipt')),
  body       TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE experience (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  role        TEXT NOT NULL,
  company     TEXT NOT NULL,
  period      TEXT NOT NULL, -- free text: "2023 — Now"
  description TEXT NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE social_links (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  label      TEXT NOT NULL,
  url        TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_projects_featured ON projects(featured, sort_order);
CREATE INDEX idx_projects_sort ON projects(sort_order);
CREATE INDEX idx_project_tags_project ON project_tags(project_id, sort_order);
CREATE INDEX idx_skills_category ON skills(category, sort_order);
CREATE INDEX idx_experience_sort ON experience(sort_order);
CREATE INDEX idx_facts_sort ON facts(sort_order);
CREATE INDEX idx_social_links_sort ON social_links(sort_order);
