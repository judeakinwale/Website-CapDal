"use client";
import SimpleDirectorCard from "@/components/common/card/simple-director-card";
import SimpleIdentityCard from "@/components/common/card/simple-identity-card";
import SimpleProjectCard from "@/components/common/card/simple-project-card";
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
  defaultProjectCategories,
  defaultProjects,
  defaultSections,
  defaultStats,
  defaultTimelines,
} from "@/sample-data";
import { Certificate } from "@/types/certificate";
import { Director } from "@/types/director";
import { Identity } from "@/types/identity";
import { Project, ProjectCategory } from "@/types/project";
import { Section, SiteSections } from "@/types/section";
import { Stat, StatSection } from "@/types/stat";
import { Timeline } from "@/types/timeline";
import { useIsFetching } from "@tanstack/react-query";
import { cn } from "cn";
import { ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

const defaultCategory = "All Projects";
const defaultProjectCount = 6;

const Projects = () => {
  const isFetching = Boolean(useIsFetching());
  const search = useSearchParams();
  const category = search.get("category")?.toLowerCase();

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: stats = defaultStats } = useGetItems<Stat>("/stat");
  const { data: projects = defaultProjects } = useGetItems<Project>("/project");
  const { data: projectsCategories = defaultProjectCategories } =
    useGetItems<ProjectCategory>("/project-category");

  const [selectedCategory, setselectedCategory] = useState<string>(
    (category || defaultCategory)?.toLowerCase(),
  );
  const [showAll, setShowAll] = useState<boolean>(false);

  const relevantStats = stats.filter(
    (s) =>
      s.section === StatSection.PROJECTS ||
      s.section === StatSection.GENERAL ||
      !s.section,
  );

  const categories = [
    defaultCategory,
    ...projectsCategories.map((c) => c.title),
  ];

  const groupedProjects = projects.reduce(
    (acc, project) => {
      const category = project?.category?.toLowerCase();
      if (!category) return acc;

      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(project);
      return acc;
    },
    {} as Record<string, Project[]>,
  );

  groupedProjects[defaultCategory?.toLowerCase()] = projects;

  const categoryProjects = showAll
    ? groupedProjects[selectedCategory]
    : groupedProjects[selectedCategory].slice(0, 6);

  const hideShowAllBtn =
    showAll || groupedProjects[selectedCategory].length <= defaultProjectCount;

  const projectsProjectsSection =
    sections.find((s) => s.section === SiteSections.PROJECTS_PROJECTS) ||
    ({} as Section);

  const projectsHeroSection =
    sections.find((s) => s.section === SiteSections.PROJECTS_HERO) ||
    ({} as Section);

  const [pps, phs] = [projectsProjectsSection, projectsHeroSection];

  React.useEffect(() => {
    if (!category) return;
    setselectedCategory(category.toLowerCase());
  }, [category]);

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-[60dvh] flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={phs?.images!}
              title={phs?.title}
              blurb={phs?.blurb}
              subTitle={phs?.subTitle}
              ctaLinks={phs?.links}
            />
          </div>
        </div>
        {/* hero */}

        {/* projects */}
        <div
          id="projects"
          className="flex justify-center bg-white py-16 text-black/80 overflow-hidden"
        >
          <div className="container flex flex-col items-center gap-12 px-4">
            <div className="w-full flex flex-col md:flex-row gap-4 justify-between">
              <div className="flex flex-col gap-4 px-4 border-s-8 border-primary">
                <h3 className="text-primary text-xl font-bold uppercase">
                  <SplitTitle title={pps?.title} separator="" />
                </h3>
                {/* <h6 className="text-black/50 text-xs font-semibold uppercase tracking-widest">
                  {pps?.subTitle}
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
            {!!categoryProjects?.length && (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                {categoryProjects?.map((d, index) => (
                  <SimpleProjectCard
                    key={d.title}
                    title={d.title}
                    image={d.image}
                    description={d.description}
                    category={d.category}
                    location={d.location}
                    completedAt={d.completedAt}
                    className={(index + 2) % 3 === 0 ? "lg:mt-12" : ""}
                    // link={d.link}
                  />
                ))}
              </div>
            )}
            {!categoryProjects?.length && (
              <NoItemFound text="No Projects Found" />
            )}
            <div
              className={cn("flex justify-center", hideShowAllBtn && "hidden ")}
            >
              <SiteButton
                variant="dark-outline"
                onClick={() => setShowAll(true)}
              >
                {pps?.links?.[0]?.title}
              </SiteButton>
            </div>
          </div>
        </div>
        {/* projects */}

        {/* stats */}
        <div
          id="stats"
          className="flex justify-center bg-primary py-16 text-white/80 overflow-hidden"
        >
          <div className="container flex flex-col md:flex-row justify-between items-center gap-8 px-4 text-center cursor-default">
            {relevantStats?.map((s) => {
              return (
                <React.Fragment key={s.title + s.value}>
                  <div className="w-full flex flex-col gap-4 hover:text-white hover:-translate-y-2 hover:gap-3 transition-all duration-300">
                    <h4 className="text-4xl font-bold">{s.value}</h4>
                    <h6 className="text-sm uppercase tracking-widest">
                      {s.title}
                    </h6>
                  </div>
                  <span className="last:hidden w-1/2 h-px md:w-1 md:min-h-2/3 bg-white/50"></span>
                </React.Fragment>
              );
            })}
          </div>
        </div>
        {/* stats */}
      </div>
    </div>
  );
};

export default Projects;
