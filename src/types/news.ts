import { DefaultItem } from "./default";

export interface NewsTag extends DefaultItem {}

export interface News extends DefaultItem {
  title: string;
  image: string;
  body: string;
  tag?: string; // NewsTag.title
  publishedAt?: string | Date;
}
