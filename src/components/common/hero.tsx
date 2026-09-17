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
    <SiteButton href={l.url} variant={getCtaVariantByIndex(index)}>
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

export interface HeroProps {
  images: SectionImage[];
  title: string;
  subTitle?: string;
  blurb?: React.ReactNode;
  cta?: React.ReactNode;
  ctaLinks?: SectionLink[];
  scrollIndicator?: React.ReactNode;
  className?: string;
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
}) => {
  //   const sample1 = (
  //     <>
  //       <section className="relative h-[100vh] w-full overflow-hidden">
  //         <div className="absolute inset-0" id="hero-slider">
  //           {/* <div className="hero-slide bg-cover bg-center" style="background-image: url('images/home-hero!.jpg')"></div>
  // <div className="hero-slide bg-cover bg-center active" style="background-image: url('images/home-hero!!.jpg')"></div>
  // <div className="hero-slide bg-cover bg-center" style="background-image:url('images/home-hero!!!.jpg')"></div> */}
  //         </div>
  //         <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#000000]/40 to-[#b80c26]/20"></div>

  //         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
  //           <span className="font-nav-link text-nav-link text-on-primary mb-4 block tracking-widest uppercase opacity-80">
  //             Since 1932
  //           </span>
  //           <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg text-on-primary max-w-4xl mb-6 drop-shadow-2xl">
  //             Builders to the Nation,
  //             <br className="hidden md:block" />
  //             Since 1932
  //           </h1>
  //           <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">
  //             Excellence in Engineering and Construction for nearly a Century
  //           </p>
  //           <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto px-4 md:px-0 mt-10">
  //             <a href="#our-legacy">
  //               <button className="bg-black text-on-primary px-8 md:px-10 py-5 md:py-6 font-label-caps text-label-caps uppercase tracking-widest hover:bg-white hover:text-heritage-red transition-all duration-500">
  //                 Explore Our Work
  //               </button>
  //             </a>
  //             <a
  //               href="#who-we-are"
  //               className="inline-block border-2 border-white text-on-primary px-8 md:px-10 py-4 md:py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-white hover:text-heritage-red transition-all duration-500"
  //             >
  //               Our Heritage
  //             </a>
  //           </div>
  //         </div>

  //         <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
  //           <span className="font-label-caps text-[10px] text-white/50 tracking-widest uppercase">
  //             Scroll
  //           </span>
  //           <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-white to-transparent"></div>
  //         </div>
  //       </section>
  //       {/* <script>
  //   const heroSlides = document.querySelectorAll('.hero-slide');
  //   let currentSlide = 1;

  //   setInterval(() => {
  //     heroSlides[currentSlide].classList.remove('active');
  //     currentSlide = (currentSlide + 1) % heroSlides.length;
  //     heroSlides[currentSlide].classList.add('active');
  //   }, 5000);
  // </script> */}
  //     </>
  //   );

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
            <SplitTitle title={title} />
          </h1>
        </div>
        <p className="text-lg font-semibold max-w-2xl">{subTitle}</p>
        {!!cta && <div className="flex flex-col md:flex-row gap-4">{cta}</div>}
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        {scrollIndicator}
      </div>
    </div>
  );
};

export default Hero;
