import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ServiceItem {
  title: string;
  description: string;
  image?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface TitleDescriptionItem {
  title: string;
  description: string;
}

export interface ComplianceItem {
  label: string;
  detail: string;
}

export interface CtaBandFields {
  ctaBandHeading?: string;
  ctaBandDescription?: string;
  ctaBandButtonText?: string;
  ctaBandButtonLink?: string;
}

export interface SiteSettings {
  brandName: string;
  logo?: string;
  favicon?: string;
  footerBlurb: string;
  navCtaText: string;
  navCtaLink: string;
  footerCtaText: string;
  footerCtaLink: string;
}

export interface HomeFrontmatter extends CtaBandFields {
  title: string;
  heroHeading: string;
  heroDescription: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroImage?: string;
  processHeading?: string;
  processSteps?: TitleDescriptionItem[];
  whyChooseUsHeading?: string;
  whyChooseUs?: TitleDescriptionItem[];
}

export interface AboutFrontmatter extends CtaBandFields {
  title: string;
  companyDescription: string;
  mission: string;
  vision: string;
  values?: TitleDescriptionItem[];
  complianceHeading?: string;
  complianceItems?: ComplianceItem[];
  ctaText?: string;
  ctaLink?: string;
}

export interface ServicesFrontmatter extends CtaBandFields {
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface ContactFrontmatter {
  title: string;
  ctaHeading?: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
  whatsappButtonText?: string;
  bookingCtaText?: string;
  bookingCtaLink?: string;
  formHeading?: string;
  formButtonText?: string;
  formSuccessMessage?: string;
}

export type PageSlug = "home" | "about" | "services";

export interface PageContent<T> {
  data: T;
  content: string;
}

export function getPageContent<T>(slug: PageSlug): PageContent<T> {
  const fullPath = path.join(contentDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    data: data as T,
    content: content.trim(),
  };
}

export function getSettings(): SiteSettings {
  const fullPath = path.join(contentDirectory, "settings.md");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data } = matter(fileContents);

  return data as SiteSettings;
}
