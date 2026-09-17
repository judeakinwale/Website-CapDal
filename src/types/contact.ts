import { DefaultItem } from "./default";

export enum ContactInfoType {
  ADDRESS = "address",
  PHONE = "phone",
  EMAIL = "email",
  MEDIA_PHONE = "media-phone",
  MEDIA_EMAIL = "media-email",
}

export interface ContactInfo extends DefaultItem {
  title: string;
  // value?: string;
  type: ContactInfoType;
}
