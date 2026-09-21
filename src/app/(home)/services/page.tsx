import { defaultMetadata } from "@/components/metadata";
import { Metadata } from "next";
import ServicesClient from "./Services";

export const metadata: Metadata = {
  title: `Services | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `Services | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/services`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const Services = () => {
  return <ServicesClient />;
};

export default Services;
