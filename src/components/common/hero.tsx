import React from "react";
import { ImageCarousel } from "./image-carousel";
import { Subtitles } from "lucide-react";
import { SectionImage, SectionLink } from "@/types/section";
import { SiteButton, SiteButtonProps } from "./site-button";
import { splitTitle } from "@/utils/text";
import { SplitTitle } from "./text/split-title";
import { cn } from "cn";

export const getCtaVariantByIndex = (
  index: number,
): SiteButtonProps["variant"] => {
  let variant: SiteButtonProps["variant"];
  switch (true) {
    case index === 0:
      variant = "dark";
      break;
    case index === 1:
      variant = "outline";
      break;
    case index % 2 === 0:
      variant = "dark-outline";
      break;
    default:
      variant = "primary";
      break;
  }

  return variant;
};

export const renderLinksAsButtons = (links: SectionLink[]): React.ReactNode => {
  if (!links) return <></>;
  return links?.map((l, index) => (
    <SiteButton key={l.url} href={l.url} variant={getCtaVariantByIndex(index)}>
      {l.title}
    </SiteButton>
  ));
};

export const ScrollTextIndicator = ({ text = "scroll" }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-2xs text-white/80 font-semibold uppercase tracking-widest">
        {text}
      </span>
      <div className="w-px h-8 md:h-12 bg-linear-to-b from-white to-transparent"></div>
    </div>
  );
};

export interface HeroConfig {
  splitTitle?: boolean;
}

const defaultHeroConfig: HeroConfig = {
  splitTitle: true,
};

export interface HeroProps {
  images: SectionImage[];
  title: string;
  subTitle?: string;
  blurb?: React.ReactNode;
  cta?: React.ReactNode;
  ctaLinks?: SectionLink[];
  scrollIndicator?: React.ReactNode;
  className?: string;
  config?: HeroConfig;
}

const Hero: React.FC<HeroProps> = ({
  images,
  title,
  subTitle,
  blurb,
  cta,
  ctaLinks,
  scrollIndicator = <ScrollTextIndicator />,
  className,
  config = defaultHeroConfig,
}) => {
  cta = cta || renderLinksAsButtons(ctaLinks!);

  return (
    <div className={cn("relative w-full h-svh overflow-hidden", className)}>
      <div className="absolute inset-0 h-full">
        <ImageCarousel images={images} />
      </div>
      <div className="absolute inset-0 bg-blend-darken bg-linear-0 from-black/40 to-black/20"></div>

      <div className="relative h-full flex flex-col items-center justify-center gap-12 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          {!!blurb && (
            <span className="text-white/80 font-semibold uppercase tracking-widest">
              {blurb}
            </span>
          )}
          <h1 className="max-w-4xl text-5xl md:text-7xl font-bold drop-shadow-2xl">
            {config?.splitTitle ? <SplitTitle title={title} /> : title}
          </h1>
        </div>
        {!!subTitle && (
          <p className="text-lg font-semibold max-w-2xl">{subTitle}</p>
        )}
        {!!cta && <div className="flex flex-col md:flex-row gap-4">{cta}</div>}
      </div>

      <div
        className={cn(
          "absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce",
          (!!cta || !!ctaLinks) && !!subTitle && "hidden md:flex",
        )}
      >
        {scrollIndicator}
      </div>
    </div>
  );
};

export default Hero;
