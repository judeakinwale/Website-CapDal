import { DefaultBulletPoint, DefaultItem, DefaultSimpleLink } from "./default";

export interface SectionImage extends DefaultSimpleLink {}

export interface SectionLink extends DefaultSimpleLink {
  title: string;
}

export interface ServiceBulletPoint extends DefaultBulletPoint {}

export interface CoreService_NotUsed extends DefaultItem {
  title: string;
  image: string;
  description?: string; // short content
  content?: string;
  blurb?: string; // random text displayed somewhere
  isCore?: boolean; // (displayed on the homepage)
  bulletPoints?: ServiceBulletPoint[];
}

export interface Service extends DefaultItem {
  title: string;
  subTitle?: string;
  images: SectionImage[];
  description?: string; // short content (required if isCore)
  content: string;
  links?: SectionLink[];
  blurb?: string; // random text displayed somewhere
  isCore?: boolean; // (displayed on the homepage)
  bulletPoints?: ServiceBulletPoint[];
}
