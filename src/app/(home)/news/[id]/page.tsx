import { Metadata, ResolvingMetadata } from "next";
import { defaultMetadata } from "@/components/metadata";
import NewsItemClient from "./NewsItem";
import { defaultNews } from "@/sample-data";
import { News } from "@/types/news";

const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;

  let newsItem = defaultNews?.find((n) => n.id === id);
  if (API_URL) {
    newsItem = await fetch(`${API_URL}/news/${id}`).then((res) => res.json());
  }

  const metadata: Metadata = {
    title: `${newsItem?.title || "News"} | ${defaultMetadata.baseTitle}`,
    description: `${newsItem?.title} - ${defaultMetadata.description}`,
    keywords: `${defaultMetadata.keywords}`,
    openGraph: {
      title: `${newsItem?.title || "News"} | ${defaultMetadata.baseTitle}`,
      description: `${newsItem?.title} - ${defaultMetadata.description}`,
      url: `${defaultMetadata.baseUrl}/news/${id}`,
      siteName: `${defaultMetadata.baseTitle}`,
      type: "website",
    },
  };

  return metadata;
}

const NewsItem = () => {
  return <NewsItemClient />;
};

export default NewsItem;
