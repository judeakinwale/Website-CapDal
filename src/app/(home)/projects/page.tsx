import { Metadata } from "next";
import { defaultMetadata } from "@/components/metadata";
import ProjectsClient from "./Projects";

export const metadata: Metadata = {
  title: `Projects | ${defaultMetadata.baseTitle}`,
  description: `${defaultMetadata.description}`,
  keywords: `${defaultMetadata.keywords}`,
  openGraph: {
    title: `Projects | ${defaultMetadata.baseTitle}`,
    description: `${defaultMetadata.description}`,
    url: `${defaultMetadata.baseUrl}/projects`,
    siteName: `${defaultMetadata.baseTitle}`,
    type: "website",
  },
};

const Projects = () => {
  return <ProjectsClient />;
};

export default Projects;
