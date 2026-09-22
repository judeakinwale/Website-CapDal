"use client";
import Hero from "@/components/common/hero";
import { useGetItems } from "@/lib/reactQuery/api";
import { defaultNews } from "@/sample-data";
import { SectionImage } from "@/types/section";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "cn";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { News } from "@/types/news";
import NoItemFound from "@/components/common/no-item-found";

const NewsItemClient = () => {
  const isFetching = Boolean(useIsFetching());
  const { id } = useParams();

  const { data: news = defaultNews } = useGetItems<News>("/news");

  const [selectedNews, setselectedNews] = useState<News | undefined>(undefined);

  const selectedNewsImages: SectionImage[] = selectedNews
    ? [
        {
          url: selectedNews?.image,
          description: selectedNews?.title,
        },
      ]
    : [];

  React.useEffect(() => {
    if (!id || !news?.length) return;
    const n = news.find((n) => n.id === id);
    setselectedNews(n);
  }, [id, news]);

  if (!selectedNews)
    return (
      <div className="w-full h-svh flex justify-center items-center">
        <NoItemFound text="News Not Found" />
      </div>
    );

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-[60vh] flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={selectedNewsImages}
              title={selectedNews?.title}
              config={{ splitTitle: false }}
              scrollIndicator={null}
            />
          </div>
        </div>
        {/* hero */}

        {/* news body */}
        <div
          id="news-body"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
              <div
                className="flex flex-col justify-center items-center gap-4"
                // px-4 border-s-8 border-primary
              >
                {/* <h3 className="text-primary text-xl font-bold uppercase">
                  <SplitTitle title={nns?.title} separator="" />
                </h3> */}
                <h6 className="text-primary text-sm font-semibold uppercase tracking-widest">
                  {selectedNews.category}
                </h6>
              </div>

              <div className="flex justify-center items-center gap-4 px-4 py-1 overflow-x-auto">
                <span
                  className={cn(
                    "shrink-0 p-1 text-black/50 text-xs font-light uppercase border-b-2 border-transparent cursor-pointer hover:text-primary/80 transition-all duration-300",
                  )}
                >
                  {selectedNews.tag}
                </span>
                {!!selectedNews.publishedAt && (
                  <span
                    className={cn(
                      "shrink-0 p-1 text-black/80 text-sm font-semibold border-b-2 border-transparent cursor-pointer hover:text-primary/80 transition-all duration-300",
                    )}
                  >
                    {new Date(selectedNews.publishedAt)?.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
            {!!selectedNews && (
              <div className="w-full max-w-3xl flex gap-4 justify-center items-center">
                {selectedNews?.body}
              </div>
            )}
          </div>
        </div>
        {/* news body */}
      </div>
    </div>
  );
};

export default NewsItemClient;
