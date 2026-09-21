"use client";
import SimpleNewsCard from "@/components/common/card/simple-news-card";
import Hero from "@/components/common/hero";
import { SiteButton } from "@/components/common/site-button";
import { SplitTitle } from "@/components/common/text/split-title";
import { useGetItems } from "@/lib/reactQuery/api";
import {
  defaultNews,
  defaultNewsCategories,
  defaultSections,
  defaultContactInfo,
} from "@/sample-data";
import { Section, SiteSections } from "@/types/section";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "cn";
import { Mail, PhoneCall } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { News, NewsCategory } from "@/types/news";
import Link from "next/link";
import { ContactInfo, ContactInfoType } from "@/types/contact";
import NewsletterForm from "@/modules/(home)/newsletter-form";
import NoItemFound from "@/components/common/no-item-found";

const defaultCategory = "All News";
const defaultNewsCount = 6;

const NewsClient = () => {
  const isFetching = Boolean(useIsFetching());
  const search = useSearchParams();
  const category = search.get("category")?.toLowerCase();

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: news = defaultNews } = useGetItems<News>("/news");
  const { data: contactInfo = defaultContactInfo } =
    useGetItems<ContactInfo>("/contact");
  const { data: newsCategories = defaultNewsCategories } =
    useGetItems<NewsCategory>("/news-category");

  const [selectedCategory, setselectedCategory] = useState<string>(
    (category || defaultCategory)?.toLowerCase(),
  );
  const [showAll, setShowAll] = useState<boolean>(false);

  const categories = [defaultCategory, ...newsCategories.map((c) => c.title)];

  const groupedNews = news.reduce(
    (acc, news) => {
      const category = news?.category?.toLowerCase();
      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(news);
      return acc;
    },
    {} as Record<string, News[]>,
  );

  groupedNews[defaultCategory?.toLowerCase()] = news;

  const categoryNews = showAll
    ? groupedNews[selectedCategory]
    : groupedNews[selectedCategory]?.slice(0, defaultNewsCount);

  const hideShowAllBtn =
    showAll || (groupedNews[selectedCategory]?.length || 0) <= defaultNewsCount;

  const groupedContactInfo = contactInfo.reduce(
    (prev: Record<ContactInfoType, ContactInfo[]>, curr: ContactInfo) => {
      prev[curr.type] = prev[curr.type] || [];
      prev[curr.type].push(curr);
      return prev;
    },
    {} as Record<ContactInfoType, ContactInfo[]>,
  );

  const newsNewsletterSection =
    sections.find((s) => s.section === SiteSections.NEWS_NEWSLETTER) ||
    ({} as Section);

  const newsMediaSection =
    sections.find((s) => s.section === SiteSections.NEWS_MEDIA) ||
    ({} as Section);

  const newsNewsection =
    sections.find((s) => s.section === SiteSections.NEWS_NEWS) ||
    ({} as Section);

  const newsHeroSection =
    sections.find((s) => s.section === SiteSections.NEWS_HERO) ||
    ({} as Section);

  const [nnls, nms, nns, nhs] = [
    newsNewsletterSection,
    newsMediaSection,
    newsNewsection,
    newsHeroSection,
  ];

  React.useEffect(() => {
    if (!category) return;
    setselectedCategory(category.toLowerCase());
  }, [category]);

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-[60vh] flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={nhs?.images!}
              title={nhs?.title}
              blurb={nhs?.blurb}
              subTitle={nhs?.subTitle}
              ctaLinks={nhs?.links}
              config={{ splitTitle: false }}
              scrollIndicator={null}
            />
          </div>
        </div>
        {/* hero */}

        {/* news */}
        <div
          id="news"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-4 px-4 border-s-8 border-primary">
                <h3 className="text-primary text-xl font-bold uppercase">
                  <SplitTitle title={nns?.title} separator="" />
                </h3>
                {/* <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                  {nns?.subTitle}
                </h6> */}
              </div>

              <div className="flex justify-center items-center gap-4 px-4 py-1 overflow-x-auto">
                {categories.map((c) => (
                  <span
                    key={c}
                    onClick={() => setselectedCategory(c?.toLowerCase())}
                    className={cn(
                      "shrink-0 p-1 text-black/80 text-sm font-semibold border-b-2 border-transparent cursor-pointer hover:text-primary/80 transition-all duration-300",
                      c?.toLowerCase() === selectedCategory &&
                        "text-primary border-primary",
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
            {!!categoryNews?.length && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                {categoryNews?.map((n, index) => (
                  <SimpleNewsCard
                    key={index + n.title}
                    title={n.title}
                    image={n.image}
                    tag={n.tag}
                    publishedAt={n.publishedAt}
                    link={`/news/${n.id}`}
                  />
                ))}
              </div>
            )}
            {!categoryNews?.length && <NoItemFound text="No News Found" />}

            {
              // TODO: add pagination instead of show all button
            }
            <div
              className={cn("flex justify-center", hideShowAllBtn && "hidden ")}
            >
              <SiteButton
                variant="dark-outline"
                onClick={() => setShowAll(true)}
              >
                {nns?.links?.[0]?.title}
              </SiteButton>
            </div>
          </div>
        </div>
        {/* news */}

        {/* media-newsletter */}
        <div
          id="media-newsletter"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden border-t border-secondary"
        >
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 cursor-default">
            {/* media */}
            <div className="w-full flex flex-col gap-8 p-4 lg:p-8">
              <h3 className="text-4xl font-bold">{nms?.title}</h3>
              <p className="text-black/50 text-sm font-semibold">
                {nms?.content}
              </p>

              {/* contact info */}
              <ul className="flex flex-col gap-8">
                <li>
                  <div className="w-full flex items-center gap-4 text-primary">
                    <div className="flex justify-center items-center p-2">
                      <PhoneCall className="w-6 h-6" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="text-xs font-bold uppercase">
                        {"Phone"}
                      </div>
                      <div className="flex flex-col gap-2 text-black/80">
                        {groupedContactInfo[ContactInfoType.MEDIA_PHONE].map(
                          (p) => (
                            <Link
                              key={p.title}
                              href={`tel:${p.title}`}
                              className="text-sm hover:text-black hover:underline transition-all"
                            >
                              {p.title}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="w-full flex items-center gap-4 text-primary">
                    <div className="flex justify-center items-center p-2">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <div className="text-xs font-bold uppercase">
                        {"Email"}
                      </div>
                      <div className="flex flex-col gap-2 text-black/80">
                        {groupedContactInfo[ContactInfoType.MEDIA_EMAIL].map(
                          (e) => (
                            <Link
                              key={e.title}
                              href={`mailto:${e.title}`}
                              className="text-sm hover:text-black hover:underline transition-all"
                            >
                              {e.title}
                            </Link>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
              {/* contact info */}
            </div>
            {/* media */}

            {/* newsletter */}
            <div className="w-full flex flex-col gap-8 bg-dark-tertiary p-4 lg:p-8 text-white/80">
              <div className="flex flex-col gap-4">
                <h4 className="text-3xl font-bold">{nnls?.title}</h4>
                <p className="text-sm font-semibold">{nnls?.content}</p>
              </div>
              <NewsletterForm />
            </div>
            {/* newsletter */}
          </div>
        </div>
        {/* media-newsletter */}
      </div>
    </div>
  );
};

export default NewsClient;
