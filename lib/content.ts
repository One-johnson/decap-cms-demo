import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "content");

export interface ServiceItem {
  title: string;
  description: string;
  image?: string;
}

export interface HomeFrontmatter {
  title: string;
  heroHeading: string;
  heroDescription: string;
  ctaText: string;
  heroImage?: string;
}

export interface AboutFrontmatter {
  title: string;
  companyDescription: string;
  mission: string;
  vision: string;
  values: string;
}

export interface ServicesFrontmatter {
  title: string;
  description: string;
  services: ServiceItem[];
}

export interface ContactFrontmatter {
  title: string;
  address: string;
  phone: string;
  email: string;
  whatsapp: string;
}

export type PageSlug = "home" | "about" | "services" | "contact";

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
