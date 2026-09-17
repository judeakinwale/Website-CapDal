import { DefaultItem } from "./default";

export interface Timeline extends DefaultItem {
  title: string;
  icon?: string;
  year: string;
  content: string;
}
