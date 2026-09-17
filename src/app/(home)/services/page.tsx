"use client";
import SimpleServiceSection, {
  SSVariant,
} from "@/components/common/card/simple-service-section";
import Hero from "@/components/common/hero";
import { SiteButton } from "@/components/common/site-button";
import { useGetItems } from "@/lib/reactQuery/api";
import { defaultSections, defaultServices } from "@/sample-data";
import { Section, SiteSections } from "@/types/section";
import { Service } from "@/types/service";
import { useIsFetching } from "@tanstack/react-query";
import { MdOutlineDesignServices } from "react-icons/md";

const Services = () => {
  const isFetching = Boolean(useIsFetching());

  const { data: sections = defaultSections } = useGetItems<Section>("/section");

  const { data: services = defaultServices } = useGetItems<Service>("/service");

  // core services are only used on the homepage
  const nonCoreServices = services; // services?.filter((s) => !s.isCore);

  const servicesCtaSection =
    sections.find((s) => s.section === SiteSections.SERVICES_CTA) ||
    ({} as Section);

  const servicesHeroSection =
    sections.find((s) => s.section === SiteSections.SERVICES_HERO) ||
    ({} as Section);

  const [scs, shs] = [servicesCtaSection, servicesHeroSection];

  return (
    <div className="">
      <div className="flex flex-col gap-0">
        {/* hero */}
        <div className="w-screen h-screen flex justify-center bg-primary/30 text-white overflow-hidden">
          <div className="w-full flex flex-col gap-12">
            <Hero
              images={shs?.images!}
              title={shs?.title}
              blurb={shs?.blurb}
              subTitle={shs?.subTitle}
              ctaLinks={shs?.links}
            />
          </div>
        </div>
        {/* hero */}

        {/* services */}
        <div
          id="services"
          className="flex justify-center bg-white py-16 text-primary overflow-hidden"
        >
          <div className="w-full flex flex-col items-center gap-12">
            {/* <div className="container flex flex-col gap-2 px-4">
              <h2 className="text-4xl font-bold">{"Our Services"}</h2>
              <div className="h-1 w-24 bg-primary"></div>
            </div> */}
            {/* services list */}
            <div className="relative min-h-64 w-full flex flex-col justify-center items-center">
              {nonCoreServices?.map((n, i) => (
                <SimpleServiceSection
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
        {/* services */}

        {/* services cta */}
        <div
          id="services-cta"
          className="bg-secondary text-black/80 py-16 overflow-hidden"
        >
          {/* background icon / text */}
          <div className="relative">
            <div className="absolute -right-70 -top-50 opacity-10">
              <MdOutlineDesignServices className="text-[50rem]" />
            </div>
          </div>

          <div className="container flex flex-col gap-8 items-center px-4 mx-auto text-center">
            <h2 className="max-w-5xl text-primary text-6xl font-bold">
              {scs?.title}
            </h2>
            <p className="text-lg max-w-2xl">{scs?.content}</p>

            <SiteButton variant="slide" href={scs?.links?.[0]?.url!}>
              {scs?.links?.[0]?.title}
            </SiteButton>
          </div>
        </div>
        {/* services cta */}
      </div>
    </div>
  );
};

export default Services;
