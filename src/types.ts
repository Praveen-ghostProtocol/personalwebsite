export type Publication = "approved" | "draft";
export interface Media {
  slot: string;
  src?: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  publication: Publication;
}
export interface ArtifactLink {
  label: string;
  href: string;
  publication: Publication;
  type?: "PDF";
  bytes?: number;
}
export interface Section {
  title: string;
  paragraphs: string[];
}
export interface Project {
  slug: string;
  title: string;
  summary: string;
  category:
    | "Startup"
    | "Side project"
    | "Personal product"
    | "Internship"
    | "Competition"
    | "Engineering";
  stage: string;
  collaborators: string;
  dates: string;
  featuredOrder?: number;
  funding?: string;
  reviewed: string;
  publication: Publication;
  body: Section[];
  media: Media[];
  links: ArtifactLink[];
}
export interface Experience {
  company: string;
  role: string;
  period: string;
  summary: string;
  incoming?: boolean;
  publication: Publication;
}
export interface Achievement {
  slug: string;
  category: "Co-curricular" | "Cricket";
  event: string;
  subtitle?: string;
  organiser: string;
  year: string;
  result: string;
  attribution: string;
  summary: string;
  publication: Publication;
  deck?: ArtifactLink;
  media: Media[];
  project?: string;
}
export interface Profile {
  name: string;
  headline: string;
  intro: string;
  story: string[];
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  portrait: Media;
  resume?: ArtifactLink;
}
