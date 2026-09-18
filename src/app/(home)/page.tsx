"use client";
import FeaturedProjectCard from "@/components/common/card/featured-project";
import NewsCard from "@/components/common/card/news-card";
import SimpleNewsCard from "@/components/common/card/simple-news-card";
import SimpleServiceCard from "@/components/common/card/simple-service-card";
import Hero, { getCtaVariantByIndex } from "@/components/common/hero";
import { SiteButton, SiteButtonProps } from "@/components/common/site-button";
import { useGetItems } from "@/lib/reactQuery/api";
import {
  defaultNews,
  defaultProjects,
  defaultSections,
  defaultServices,
  defaultStats,
} from "@/sample-data";
import { News } from "@/types/news";
import { Project } from "@/types/project";
import { Section, SiteSections } from "@/types/section";
import { Service } from "@/types/service";
import { Stat, StatSection } from "@/types/stat";
import { Button } from "@base-ui/react";
import { useIsFetching } from "@tanstack/react-query";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MdConstruction } from "react-icons/md";

const Landing = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: news = defaultNews } = useGetItems<News>("/news");
  const { data: projects = defaultProjects } = useGetItems<Project>("/project");
  // TODO: move this comment to the services page when it's created
  // ? the detailed services page is too un-uniform so it's not currently backend configurable
  // currently, only core services (isCore === true) are mocked
  const { data: services = defaultServices } = useGetItems<Service>("/service");
  const { data: stats = defaultStats } = useGetItems<Stat>("/stat");
  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const relevantStats = stats.filter(
    (s) =>
      s.section === StatSection.HOME ||
      s.section === StatSection.GENERAL ||
      !s.section,
  );

  const coreServices = services?.filter((s) => s.isCore);
  const featuredProjects = projects?.filter((p) => p.isFeatured);

  const whoWeAreSection =
    sections.find((s) => s.section === SiteSections.WHO_WE_ARE) ||
    ({} as Section);

  const homeServicesSection =
    sections.find((s) => s.section === SiteSections.HOME_SERVICES) ||
    ({} as Section);

  const homeLandmarksSection =
    sections.find((s) => s.section === SiteSections.HOME_LANDMARKS) ||
    ({} as Section);

  const homeInsightsSection =
    sections.find((s) => s.section === SiteSections.HOME_INSIGHTS) ||
    ({} as Section);

  const homeCtaSection =
    sections.find((s) => s.section === SiteSections.HOME_CTA) ||
    ({} as Section);

  const homeHeroSection =
    sections.find((s) => s.section === SiteSections.HOME_HERO) ||
    ({} as Section);

  const [wwas, hhs, hss, hls, his, hcs] = [
    whoWeAreSection,
    homeHeroSection,
    homeServicesSection,
    homeLandmarksSection,
    homeInsightsSection,
    homeCtaSection,
  ];

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-screen flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={hhs?.images!}
              title={hhs?.title}
              blurb={hhs?.blurb}
              subTitle={hhs?.subTitle!}
              ctaLinks={hhs?.links}
            />
          </div>
        </div>
        {/* hero */}

        {/* who we are */}
        <div
          id="who-we-are"
          className="flex justify-center bg-white py-16 text-primary overflow-hidden"
        >
          <div className="container flex flex-col gap-12 px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="flex flex-col gap-2">
                  <h2 className="text-4xl font-bold">{wwas?.title}</h2>
                  <div className="h-1 w-24 bg-primary"></div>
                </div>
                <p className="text-black/80">{wwas?.subTitle}</p>
                <p className="text-sm text-secondary-alt">{wwas?.content}</p>
                <Link
                  className="flex items-center gap-2 text-sm text-primary font-semibold uppercase hover:gap-4 transition-all duration-300 "
                  href={wwas?.links?.[0]?.url || ""}
                >
                  {wwas?.links?.[0]?.title} <ArrowRight />
                </Link>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <img
                    alt={wwas?.images?.[0]?.description}
                    className="w-full h-100 object-cover shadow-xl lg:grayscale hover:grayscale-0 transition-all duration-700"
                    src={wwas?.images?.[0]?.url}
                  />
                  <img
                    alt={wwas?.images?.[1]?.description}
                    className="hidden sm:flex w-full h-100 object-cover mt-12 shadow-xl lg:grayscale hover:grayscale-0 transition-all duration-700"
                    src={wwas?.images?.[1]?.url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* who we are */}

        {/* stats */}
        <div
          id="stats"
          className="flex justify-center bg-secondary-alt py-16 text-white/80 overflow-hidden"
        >
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 px-4 text-center cursor-default">
            {relevantStats?.map((s) => {
              return (
                <>
                  <div className="w-full flex flex-col gap-4 hover:text-white hover:-translate-y-2 hover:gap-3 transition-all duration-300">
                    <h4 className="text-4xl font-bold">{s.value}</h4>
                    <h6 className="text-sm uppercase tracking-widest">
                      {s.title}
                    </h6>
                  </div>
                  <span className="last:hidden w-1/2 h-px md:w-1 md:min-h-2/3 bg-white/50"></span>
                </>
              );
            })}
          </div>
        </div>
        {/* stats */}

        {/* core services */}
        <div
          id="core-services"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="flex flex-col gap-4 items-center">
              <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                {hcs?.subTitle}
              </h6>
              <h3 className="text-primary text-4xl font-bold">{hcs?.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
              {coreServices?.map((n) => (
                <SimpleServiceCard
                  key={n.title}
                  title={n.title}
                  image={n.image}
                  description={n.description}
                  blurb={n.blurb}
                  link={`/news/${n.id}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* core services */}

        {/* featured projects (our legacy) */}
        <div
          id="our-legacy"
          className="flex justify-center bg-white py-16 text-primary overflow-hidden"
        >
          <div className="container flex flex-col gap-12 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
              <div className="flex flex-col gap-4">
                <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                  {hls?.subTitle}
                </h6>
                <h3 className="text-primary text-4xl font-bold">
                  {hls?.title}
                </h3>
              </div>

              <Link
                href={hls?.links?.[0]?.url!}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest hover:gap-4 hover:text-black/90 transition-all duration-300"
              >
                {hls?.links?.[0]?.title}
                <ArrowUpRight className="h-4 shrink-0" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto">
              {featuredProjects?.map((p) => {
                return (
                  <FeaturedProjectCard
                    title={p.title}
                    image={p.image}
                    category={p.category}
                    description={p.description}
                  />
                );
              })}
            </div>
          </div>
        </div>
        {/* featured projects (our legacy) */}

        {/* latest news (insights) */}
        <div
          id="insights"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="flex flex-col gap-4 items-center">
              <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                {his?.subTitle}
              </h6>
              <h3 className="text-primary text-4xl font-bold">{his?.title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
              {// TODO: consider using grid instead for the containing div, update services with this as well
              news?.map((n) => (
                <SimpleNewsCard // NewsCard
                  key={n.title + n.publishedAt}
                  title={n.title}
                  image={n.image}
                  tag={n.tag}
                  publishedAt={n.publishedAt}
                  link={`/news/${n.id}`}
                />
              ))}
            </div>
          </div>
        </div>
        {/* latest news (insights) */}

        {/* home cta */}
        <div
          id="home-cta"
          className="bg-primary py-16 text-white overflow-hidden"
        >
          {/* background icon / text */}
          <div className="relative">
            <div className="absolute -right-40 -top-10 hidden lg:flex text-[30vw] opacity-3 pointer-events-none">
              construction
            </div>
            <div className="absolute -right-70 -top-50 opacity-10">
              <MdConstruction className="text-[50rem]" />
            </div>
          </div>

          <div className="container flex flex-col gap-8 items-center px-4 mx-auto text-center">
            <h2 className="max-w-5xl text-6xl font-bold">{hcs?.title}</h2>
            <p className="text-lg text-white/80 max-w-2xl">{hcs?.content}</p>

            <SiteButton href={hcs?.links?.[0]?.url!}>
              {hcs?.links?.[0]?.title}
            </SiteButton>
          </div>
        </div>
        {/* home cta */}
      </div>
    </div>
  );
};

export default Landing;
