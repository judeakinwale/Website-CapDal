"use client";
import SimpleDirectorCard from "@/components/common/card/simple-director-card";
import SimpleIdentityCard from "@/components/common/card/simple-identity-card";
import SimpleTimelineCard from "@/components/common/card/simple-timeline-card";
import Hero from "@/components/common/hero";
import NoItemFound from "@/components/common/no-item-found";
import { SiteButton } from "@/components/common/site-button";
import { SplitTitle } from "@/components/common/text/split-title";
import { useGetItems } from "@/lib/reactQuery/api";
import {
  defaultCertificates,
  defaultDirectors,
  defaultIdentity,
  defaultSections,
  defaultTimelines,
} from "@/sample-data";
import { Certificate } from "@/types/certificate";
import { Director } from "@/types/director";
import { Identity } from "@/types/identity";
import { Section, SiteSections } from "@/types/section";
import { Timeline } from "@/types/timeline";
import { useIsFetching } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";

const About = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: certificates = defaultCertificates } =
    useGetItems<Certificate>("/certificate");
  const { data: directors = defaultDirectors } =
    useGetItems<Director>("/director");
  const { data: identity = defaultIdentity } =
    useGetItems<Identity>("/identity");
  const { data: timelines = defaultTimelines } =
    useGetItems<Timeline>("/timeline");

  const aboutFoundersSection =
    sections.find((s) => s.section === SiteSections.ABOUT_FOUNDERS) ||
    ({} as Section);

  const aboutTimelineSection =
    sections.find((s) => s.section === SiteSections.ABOUT_TIMELINE) ||
    ({} as Section);

  const aboutDirectorsSection =
    sections.find((s) => s.section === SiteSections.ABOUT_DIRECTORS) ||
    ({} as Section);

  const aboutCertificatesSection =
    sections.find((s) => s.section === SiteSections.ABOUT_CERTIFICATES) ||
    ({} as Section);

  const aboutHeroSection =
    sections.find((s) => s.section === SiteSections.ABOUT_HERO) ||
    ({} as Section);

  const [afs, ats, ads, acs, ahs] = [
    aboutFoundersSection,
    aboutTimelineSection,
    aboutDirectorsSection,
    aboutCertificatesSection,
    aboutHeroSection,
  ];

  const afsMainImage = afs?.images?.[0];
  const afsMainBulletPoint = afs?.bulletPoints?.[0];
  const afsSideBulletPoints = afs?.bulletPoints?.slice(1);

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-dvh flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={ahs?.images!}
              title={ahs?.title}
              blurb={ahs?.blurb}
              subTitle={ahs?.subTitle}
              ctaLinks={ahs?.links}
              cta={
                <SiteButton href={ahs?.links?.[0]?.url as string}>
                  <div className="flex flex-col gap-2 items-center">
                    <span>{ahs?.links?.[0]?.title}</span>
                    <ChevronDown className="h-6! w-6!" />
                  </div>
                </SiteButton>
              }
            />
          </div>
        </div>
        {/* hero */}

        {/* founders */}
        <div
          id="founders"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4">
            <div className="group relative flex justify-center md:justify-end">
              {/* <div className="absolute -top-10 -left-10 z-50 w-40 h-40 border-t-4 border-l-4 border-primary/20 -z-10 bg-primary"></div> */}
              <img
                alt={afsMainImage?.description}
                className="w-full max-w-xl aspect-4/5 object-cover shadow-xl group-hover:scale-105 transition-all duration-500"
                src={afsMainImage?.url}
              />
              <div className="absolute bottom-0 right-0 flex flex-col gap-2 bg-primary p-4 text-white translate-x-2 md:translate-x-8 -translate-y-12">
                <p className="text-4xl font-semibold">
                  {afsMainBulletPoint?.title}
                </p>
                <p className="text-xs uppercase">
                  {afsMainBulletPoint?.description}
                </p>
              </div>
            </div>

            <div className="max-w-xl flex flex-col gap-8 p-4">
              <div className="flex flex-col gap-4">
                <h2 className="text-primary text-4xl font-bold">
                  <SplitTitle
                    title={afs?.title}
                    separator="&"
                    hideBreak={false}
                  />
                </h2>
                <p className="text-black leading-relaxed">{afs?.content}</p>
                <p className="px-4 text-sm italic border-l-4 border-primary">
                  {afs?.blurb}
                </p>
              </div>
              {/* other bullet points */}
              <div className="flex items-center gap-8 text-primary">
                {afsSideBulletPoints?.map((bp) => (
                  <div key={bp.title}>
                    <p className="text-sm font-bold">{bp.title}</p>
                    <p className="text-xs uppercase">{bp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* founders */}

        {/* timeline */}
        <div
          id="timeline"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col gap-12 px-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-bold">{ats?.title}</h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div>
            {!!timelines?.length && (
              <div className="relative min-h-64 flex flex-col flex-wrap gap-12 lg:gap-8 justify-center items-center">
                {timelines?.map((n, i) => (
                  <SimpleTimelineCard
                    key={n.title}
                    title={n.title}
                    icon={n.icon}
                    content={n.content}
                    year={n.year}
                    variant={i % 2 === 0 ? "left" : "right"}
                  />
                ))}
                <div className="absolute inset-0 z-0 left-1/2 w-1 -translate-x-1/2 bg-primary"></div>
              </div>
            )}
            {!timelines?.length && (
              <NoItemFound text="No Timeline Entries Found" />
            )}
          </div>
        </div>
        {/* timeline */}

        {/* mission, vision, values */}
        <div
          id="mission-vision-values"
          className="flex justify-center bg-primary py-16 text-white/80 overflow-hidden"
        >
          <div className="container flex flex-col gap-12 px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {identity?.map((i) => (
                <SimpleIdentityCard
                  key={i.title + i.type}
                  title={i.title}
                  type={i.type}
                  icon={i.icon!}
                  content={i.content}
                />
              ))}
            </div>
          </div>
        </div>
        {/* mission-vision-values */}

        {/* board of directors */}
        <div
          id="board-of-directors"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="flex flex-col gap-4 items-center">
              <h3 className="text-primary text-4xl font-bold">{ads?.title}</h3>
              <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                {ads?.subTitle}
              </h6>
            </div>
            {!!directors?.length && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center items-center">
                {directors?.map((d) => (
                  <SimpleDirectorCard
                    key={d.title + d.name}
                    name={d.name}
                    title={d.title}
                    image={d.image}
                    summary={d.summary}
                    link={d.link}
                  />
                ))}
              </div>
            )}
            {!directors?.length && (
              <NoItemFound text="No Director Entries Found" />
            )}
          </div>
        </div>
        {/* board of directors */}

        {/* certificates */}
        <div
          id="certificates"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="flex flex-col gap-4 items-center">
              <h5 className="text-black/50 text-xl font-semibold uppercase tracking-widest">
                {acs?.title}
              </h5>
            </div>
            <div className="flex flex-row flex-wrap gap-12 justify-center items-center">
              {certificates?.map((c) => (
                <img
                  alt={c.title}
                  className="h-16 md:h-20 w-auto object-contain"
                  src={c.value}
                />
              ))}
            </div>
          </div>
        </div>
        {/* certificates */}
      </div>
    </div>
  );
};

export default About;
