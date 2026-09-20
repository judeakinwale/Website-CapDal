import type { MetadataRoute } from "next";
import { defaultMetadata } from "@/components/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${defaultMetadata.baseTitle} Website`,
    short_name: defaultMetadata.baseTitle,
    description: defaultMetadata.altDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#cd2b24",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
