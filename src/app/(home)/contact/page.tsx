import { Metadata } from "next";
import { defaultMetadata } from "@/components/metadata";
import ContactClient from "./Contact";

export const metadata: Metadata = {
  title: `Contact | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `Contact | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/contact`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const Contact = () => {
  return <ContactClient />;
};

export default Contact;
