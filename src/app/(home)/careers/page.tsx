"use client";
import SimpleCareersection, {
  SSVariant,
} from "@/components/common/card/simple-service-section";
import Hero from "@/components/common/hero";
import { SiteButton } from "@/components/common/site-button";
import { useGetItems } from "@/lib/reactQuery/api";
import { defaultSections, defaultRoles } from "@/sample-data";
import { Section, SiteSections } from "@/types/section";
import { Service } from "@/types/service";
import { useIsFetching } from "@tanstack/react-query";
import { MdOutlineWorkHistory } from "react-icons/md";

const Careers = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: roles = defaultRoles } = useGetItems<Service>("/service");

  const careerCtaSection =
    sections.find((s) => s.section === SiteSections.CAREER_CTA) ||
    ({} as Section);

  const careerHeroSection =
    sections.find((s) => s.section === SiteSections.CAREER_HERO) ||
    ({} as Section);

  const [ccs, chs] = [careerCtaSection, careerHeroSection];

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

        {/* roles */}
        <div
          id="roles"
          className="flex justify-center bg-white py-16 text-primary overflow-hidden"
        >
          <div className="w-full flex flex-col items-center gap-12">
            {/* <div className="container flex flex-col gap-2 px-4">
              <h2 className="text-4xl font-bold">{"Our Roles"}</h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div> */}
            {/* roles list */}
            <div className="relative min-h-64 w-full flex flex-col justify-center items-center">
              {roles?.map((n, i) => (
                <SimpleRoleCard
                  key={n.title}
                  title={n.title}
                  image={n.image}
                  content={n.content}
                  description={n.description}
                  blurb={n.blurb}
                  bulletPoints={n.bulletPoints}
                  variant={i % 2 === 0 ? SSVariant.LEFT : SSVariant.RIGHT}
                />
              ))}
            </div>
          </div>
        </div>
        {/* roles */}

        {/* career cta */}
        <div
          id="career-cta"
          className="bg-secondary text-black/80 py-16 overflow-hidden"
        >
          {/* background icon / text */}
          <div className="relative">
            <div className="absolute -right-70 -top-50 opacity-10">
              <MdOutlineWorkHistory className="text-[50rem]" />
            </div>
          </div>

          <div className="container flex flex-col gap-8 items-center px-4 mx-auto text-center">
            <h2 className="max-w-5xl text-primary text-6xl font-bold">
              {ccs?.title}
            </h2>
            <p className="text-lg max-w-2xl">{ccs?.content}</p>

            <SiteButton variant="slide" href={ccs?.links?.[0]?.url!}>
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
