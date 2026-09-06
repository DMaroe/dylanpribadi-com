export type Profile = {
  id: number;
  name: string;
  hero_eyebrow: string;
  hero_headline: string;
  hero_subhead: string;
  cta_heading: string;
  cta_note: string;
  availability: string;
  contact_intro: string;
  email: string;
  whatsapp_number: string | null;
  whatsapp_url: string | null;
  footer_note: string;
};

export type Fact = {
  id: number;
  label: string;
  value: string;
  sort_order: number;
};

export type ProjectTag = {
  name: string;
  on_card: number;
  sort_order: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  role: string;
  year: string;
  home_summary: string | null;
  summary: string;
  modal_summary: string | null;
  detail: string | null;
  link_url: string | null;
  repo_url: string | null;
  featured: number;
  sort_order: number;
  created_at: string;
  tags: ProjectTag[];
};

export type SkillCategory = "toolkit" | "tool" | "receipt";

export type Skill = {
  id: number;
  name: string;
  category: SkillCategory;
  body: string | null;
  sort_order: number;
};

export type Experience = {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
  sort_order: number;
};

export type SocialLink = {
  id: number;
  label: string;
  url: string;
  sort_order: number;
};
