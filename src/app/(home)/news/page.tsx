import { Metadata } from "next";
import { defaultMetadata } from "@/components/metadata";
import NewsClient from "./News";

export const metadata: Metadata = {
  title: `News | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `News | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/news`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const News = () => {
  return <NewsClient />;
};

export default News;
