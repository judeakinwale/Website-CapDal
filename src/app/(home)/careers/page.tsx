"use client";
import SimpleRoleCard from "@/components/common/card/simple-role-card";
import SimpleCareersection, {
  SSVariant,
} from "@/components/common/card/simple-service-section";
import Hero from "@/components/common/hero";
import { Icon } from "@/components/common/icon";
import NoItemFound from "@/components/common/no-item-found";
import { SiteButton } from "@/components/common/site-button";
import { SplitTitle } from "@/components/common/text/split-title";
import { useGetItems } from "@/lib/reactQuery/api";
import {
  defaultSections,
  defaultRoles,
  defaultRoleDivisions,
  defaultStats,
} from "@/sample-data";
import { Role, RoleDivision } from "@/types/role";
import { Section, SiteSections } from "@/types/section";
import { Service } from "@/types/service";
import { Stat, StatSection } from "@/types/stat";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "cn";
import { Quote } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { MdOutlineWorkHistory } from "react-icons/md";

const defaultDivision = "All Roles";
const defaultRoleCount = 6;

const Careers = () => {
  const isFetching = Boolean(useIsFetching());
  const search = useSearchParams();
  const division = search.get("category")?.toLowerCase();

  const { data: stats = defaultStats } = useGetItems<Stat>("/stat");
  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: roles = defaultRoles } = useGetItems<Role>("/role");
  const { data: roleDivisions = defaultRoleDivisions } =
    useGetItems<RoleDivision>("/role-division");

  const [selectedDivision, setselectedDivision] = useState<string>(
    (division || defaultDivision)?.toLowerCase(),
  );
  const [showAll, setShowAll] = useState<boolean>(true);

  const relevantStats = stats.filter(
    (s) =>
      s.section === StatSection.CAREERS ||
      s.section === StatSection.GENERAL ||
      !s.section,
  );

  const divisions = [defaultDivision, ...roleDivisions.map((c) => c.title)];

  // grouped active roles
  const groupedRoles = roles.reduce(
    (acc, r) => {
      const division = r?.division?.toLowerCase();
      if (!division) return acc;

      const isValid = r.expiresAt ? new Date(r.expiresAt) >= new Date() : true;
      if (!isValid) return acc;

      if (!acc[division]) {
        acc[division] = [];
      }
      acc[division].push(r);
      return acc;
    },
    {} as Record<string, Role[]>,
  );

  groupedRoles[defaultDivision?.toLowerCase()] = roles;

  const divisionRoles = showAll
    ? groupedRoles[selectedDivision]
    : groupedRoles[selectedDivision]?.slice(0, defaultRoleCount);

  const hideShowAllBtn =
    showAll ||
    (groupedRoles[selectedDivision]?.length || 0) <= defaultRoleCount;

  // const activeRoles = roles?.filter((r) =>
  //   r.expiresAt ? new Date(r.expiresAt) >= new Date() : true,
  // );

  const careerCultureSection =
    sections.find((s) => s.section === SiteSections.CAREER_CULTURE) ||
    ({} as Section);

  const careerCultureQuoteSection =
    sections.find((s) => s.section === SiteSections.CAREER_CULTURE_QUOTE) ||
    ({} as Section);

  const careerRolesSection =
    sections.find((s) => s.section === SiteSections.CAREER_ROLES) ||
    ({} as Section);

  const careerCtaSection =
    sections.find((s) => s.section === SiteSections.CAREER_CTA) ||
    ({} as Section);

  const careerHeroSection =
    sections.find((s) => s.section === SiteSections.CAREER_HERO) ||
    ({} as Section);

  const [ccls, ccqs, crs, ccs, chs] = [
    careerCultureSection,
    careerCultureQuoteSection,
    careerRolesSection,
    careerCtaSection,
    careerHeroSection,
  ];

  const cclsMainImage = ccls?.images?.[0];
  // const cclsMainBulletPoint = ccls?.bulletPoints?.[0];
  // const cclsSideBulletPoints = ccls?.bulletPoints?.slice(1);

  React.useEffect(() => {
    if (!division) return;
    setselectedDivision(division.toLowerCase());
  }, [division]);

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-screen flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={chs?.images!}
              title={chs?.title}
              blurb={chs?.blurb}
              subTitle={chs?.subTitle}
              ctaLinks={chs?.links}
            />
          </div>
        </div>
        {/* hero */}

        {/* stats */}
        <div
          id="stats"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 px-4 text-center cursor-default">
            {relevantStats?.map((s) => {
              return (
                <>
                  <div className="group w-full flex flex-col gap-4 hover:-translate-y-2 hover:gap-3 hover:text-black transition-all duration-300">
                    <h4 className="text-5xl text-primary font-medium">
                      {s.value}
                    </h4>
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

        {/* culture */}
        <div
          id="culture"
          className="flex justify-center bg-secondary py-16 text-black/80 overflow-hidden"
        >
          <div className="container grid grid-cols-1 md:grid-cols-2 items-center gap-12 px-4">
            <div className="max-w-xl flex flex-col gap-8 p-4 lg:p-8">
              <div className="flex flex-col gap-4">
                <h6 className="text-primary text-xs font-semibold uppercase tracking-widest">
                  {ccls?.subTitle}
                </h6>
                <h3 className="text-black text-4xl font-bold">{ccls?.title}</h3>
              </div>

              <div className="flex flex-col gap-4">
                {ccls?.bulletPoints?.map((p) => {
                  return (
                    <React.Fragment key={p.title + p.icon}>
                      <div className="group flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <Icon
                            name={p.icon || "MdInfo"}
                            className="text-2xl text-primary"
                          />
                          <h4 className="text-2xl text-black font-semibold">
                            {p.title}
                          </h4>
                        </div>

                        <p className="text-sm">{p.description}</p>
                      </div>
                      <div className="flex last:hidden w-full h-px bg-black/5"></div>
                    </React.Fragment>
                  );
                })}
              </div>
            </div>

            <div className="group relative flex justify-center md:justify-start">
              <img
                alt={cclsMainImage?.description}
                className="w-full max-w-xl aspect-4/5 object-cover shadow-xl group-hover:scale-105 transition-all duration-500"
                src={cclsMainImage?.url}
              />
              <div className="absolute bottom-0 left-0 max-w-80 flex flex-col gap-2 bg-primary p-4 lg:p-8 text-white -translate-x-2 md:-translate-16 -translate-y-20">
                <p className="flex flex-col text-lg text-white font-semibold">
                  <Quote className="w-4 h-4 shrink-0" />
                  <span className="leading-snug">{ccqs?.content}</span>
                  <Quote className="w-4 h-4 shrink-0" />
                </p>
                <p className="text-xs text-white/60 font-semibold uppercase">
                  {ccqs?.title}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* culture */}

        {/* roles */}
        <div
          id="roles"
          className="flex justify-center bg-dark-tertiary py-16 text-white/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-4 px-4 border-s-8 border-primary">
                <h6 className="text-primary text-xs font-semibold uppercase tracking-widest">
                  {crs?.subTitle}
                </h6>
                <h3 className="text-white text-3xl font-bold">
                  <SplitTitle title={crs?.title} separator="" />
                </h3>
              </div>

              <div className="flex justify-center items-center gap-4 px-4 py-1 overflow-x-auto">
                {divisions.map((c) => (
                  <span
                    key={c}
                    onClick={() => setselectedDivision(c?.toLowerCase())}
                    className={cn(
                      "shrink-0 p-1 text-white/80 text-sm font-semibold border-b-2 border-transparent cursor-pointer hover:text-primary/80 transition-all duration-300",
                      c?.toLowerCase() === selectedDivision &&
                        "text-primary border-primary",
                    )}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            {/* roles list */}
            {!!divisionRoles?.length && (
              <div className="relative w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                {divisionRoles?.map((r, index) => (
                  <SimpleRoleCard
                    key={r.title}
                    title={r.title}
                    description={r.description}
                    division={r.division}
                    type={r.type}
                    location={r.location}
                    image={r.image}
                    expiresAt={r.expiresAt}
                  />
                ))}
              </div>
            )}

            {!divisionRoles?.length && (
              <NoItemFound text="No Roles Available" />
            )}

            <div className="flex flex-col items-center gap-8">
              <div className="text-white/50">{crs.content}</div>

              <SiteButton
                variant="primary-outline"
                href={crs?.links?.[0]?.url!}
                className="w-fit"
              >
                {crs?.links?.[0]?.title}
              </SiteButton>
            </div>
          </div>
        </div>
        {/* roles */}

        {/* career cta */}
        <div
          id="career-cta"
          className="bg-primary text-white/80 py-16 overflow-hidden"
        >
          {/* background icon / text */}
          <div className="relative">
            <div className="absolute -right-70 -top-50 opacity-10">
              <MdOutlineWorkHistory className="text-[50rem]" />
            </div>
          </div>

          <div className="container flex flex-col gap-8 items-center px-4 mx-auto text-center">
            <h2 className="max-w-5xl text-white text-6xl font-bold">
              {ccs?.title}
            </h2>
            <p className="text-lg max-w-2xl">{ccs?.content}</p>

            <SiteButton variant="dark" href={ccs?.links?.[0]?.url!}>
              {ccs?.links?.[0]?.title}
            </SiteButton>
          </div>
        </div>
        {/* career cta */}
      </div>
    </div>
  );
};

export default Careers;
