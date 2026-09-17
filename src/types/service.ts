import { DefaultBulletPoints, DefaultItem } from "./default";

export interface ServiceBulletPoints extends DefaultBulletPoints {}

export interface Service extends DefaultItem {
  title: string;
  image: string;
  description?: string; // short content
  content?: string;
  blurb?: string; // random text displayed somewhere
  isCore?: boolean; // (displayed on the homepage)
  bulletPoints?: ServiceBulletPoints[];
}
