import { DefaultItem } from "./default";

// export interface RoleType extends DefaultItem {}

export enum RoleType {
  FULL_TIME = "Full-Time",
  PART_TIME = "Part-Time",
  CONTRACT = "Contract",
  INTERN = "Intern",
  TEMPORARY = "Temporary",
}

export interface Role extends DefaultItem {
  title: string;
  description: string;
  division: string;
  type: RoleType;
  location: string;
  image?: string;
  expiresAt?: string | Date;
}
