import { defaultMetadata } from "@/components/metadata";
import { Metadata } from "next";
import CareersClient from "./Careers";

export const metadata: Metadata = {
  title: `Careers | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `Careers | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/careers`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const Careers = () => {
  return <CareersClient />;
};

export default Careers;
