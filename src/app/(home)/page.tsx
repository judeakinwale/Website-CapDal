import { defaultMetadata } from "@/components/metadata";
import { Metadata } from "next";
import LandingClient from "./Landing";

export const metadata: Metadata = {
  title: `Home | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `Home | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: "https://capdal.com",
    siteName: `${defaultMetadata.baseTitle}`,
    // images: [
    //   {
    //     url: "https://mywebsite.com",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    type: "website",
  },
};

const Landing = () => {
  return <LandingClient />;
};

export default Landing;
