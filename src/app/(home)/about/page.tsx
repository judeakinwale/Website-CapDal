import { defaultMetadata } from "@/components/metadata";
import { Metadata } from "next";
import AboutClient from "./About";

export const metadata: Metadata = {
  title: `About | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `About | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/about`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const About = () => {
  return <AboutClient />;
};

export default About;
