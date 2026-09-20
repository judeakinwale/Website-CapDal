import { Service, ServiceBulletPoint } from "@/types/service";
import Link from "next/link";
import React from "react";
import { Icon } from "../icon";
import { cn } from "cn";
import { SplitTitle } from "../text/split-title";
import { ArrowRight } from "lucide-react";

export enum SSVariant {
  LEFT = "left",
  RIGHT = "right",
}

export enum SSBulletPointVariant {
  LIST = "list",
  ICON_LIST = "icon-list",
  CARD_LIST = "card-list",
  CARD_LIST_SECONDARY = "card-list-secondary",
  ROW = "row",
}

// referencing the background color and hence the text color
export enum SSColorVariant {
  WHITE = "white",
  SECONDARY = "secondary",
  PRIMARY = "primary",
}

export const geServiceVariantByIndex = (index: number) => {
  const isEven = index % 2 === 0;
  const variant = {
    image: isEven ? SSVariant.RIGHT : SSVariant.LEFT,
    background: SSColorVariant.WHITE,
    bulletpoint: SSBulletPointVariant.ICON_LIST,
  };

  switch (true) {
    case index === 0:
      console.log({ index, variant });
      return variant;

    case index === 1: {
      variant.background = SSColorVariant.SECONDARY;
      variant.bulletpoint = SSBulletPointVariant.ROW;
      console.log({ index, check: [index === 1, "index === 1"], variant });
      return variant;
    }

    case index % 4 === 0: {
      variant.bulletpoint = SSBulletPointVariant.CARD_LIST_SECONDARY;
      console.log({
        index,
        check: [index % 4 === 0, "index % 4 === 0"],
        variant,
      });
      return variant;
    }

    case index % 3 === 0: {
      variant.background = SSColorVariant.PRIMARY;
      variant.bulletpoint = SSBulletPointVariant.LIST;
      console.log({
        index,
        check: [index % 3 === 0, "index % 3 === 0"],
        variant,
      });
      return variant;
    }

    case index % 2 === 0: {
      variant.bulletpoint = SSBulletPointVariant.CARD_LIST;
      console.log({
        index,
        check: [index % 2 === 0, "index % 2 === 0"],
        variant,
      });
      return variant;
    }

    default:
      console.log({ index, variant });
      return variant;
  }
};

export interface ServiceBulletPointsProps {
  bulletpoints: ServiceBulletPoint[];
  variant?: SSBulletPointVariant;
}

export const ServiceBulletPoints: React.FC<ServiceBulletPointsProps> = ({
  bulletpoints,
  variant = SSBulletPointVariant.ICON_LIST,
}) => {
  // const sample1 = (
  //   <ul className="space-y-4 mb-10">
  //     <li className="flex items-center gap-3 text-on-background">
  //       <span
  //         className="material-symbols-outlined text-primary"
  //         data-weight="fill"
  //       >
  //         check_circle
  //       </span>
  //       <span className="body-font text-body-md">
  //         Advanced Paving &amp; Highway Construction
  //       </span>
  //     </li>
  //     <li className="flex items-center gap-3 text-on-background">
  //       <span
  //         className="material-symbols-outlined text-primary"
  //         data-weight="fill"
  //       >
  //         check_circle
  //       </span>
  //       <span className="body-font text-body-md">
  //         Structural Bridge Engineering
  //       </span>
  //     </li>
  //     <li className="flex items-center gap-3 text-on-background">
  //       <span
  //         className="material-symbols-outlined text-primary"
  //         data-weight="fill"
  //       >
  //         check_circle
  //       </span>
  //       <span className="body-font text-body-md">
  //         Urban Drainage &amp; Sewage Management
  //       </span>
  //     </li>
  //   </ul>
  // );

  // const sample2 = (
  //   <div className="grid grid-cols-2 gap-stack-md mb-10">
  //     <div className="border-l-4 border-primary pl-4">
  //       <span className="ui-font text-stat-callout text-primary block">
  //         100%
  //       </span>
  //       <span className="ui-font text-label-bold text-on-secondary-container uppercase">
  //         Safety Compliance
  //       </span>
  //     </div>
  //     <div className="border-l-4 border-primary pl-4">
  //       <span className="ui-font text-stat-callout text-primary block">
  //         90+
  //       </span>
  //       <span className="ui-font text-label-bold text-on-secondary-container uppercase">
  //         Active Sites
  //       </span>
  //     </div>
  //   </div>
  // );

  // const sample3 = (
  //   <div className="space-y-6">
  //     <div className="flex gap-4 items-start">
  //       <div className="w-12 h-12 bg-surface-container flex items-center justify-center flex-shrink-0">
  //         <span className="material-symbols-outlined text-primary">
  //           architecture
  //         </span>
  //       </div>
  //       <div>
  //         <h4 className="headline-font text-headline-md">
  //           Integrated Architectural Team
  //         </h4>
  //         <p className="body-font text-on-secondary-container">
  //           Seamless coordination from first sketch to final brick.
  //         </p>
  //       </div>
  //     </div>
  //     <div className="flex gap-4 items-start">
  //       <div className="w-12 h-12 bg-surface-container flex items-center justify-center flex-shrink-0">
  //         <span className="material-symbols-outlined text-primary">
  //           analytics
  //         </span>
  //       </div>
  //       <div>
  //         <h4 className="headline-font text-headline-md">BIM Modeling</h4>
  //         <p className="body-font text-on-secondary-container">
  //           3D digital twins for clash detection and cost optimization.
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  // const sample4 = (
  //   <div className="space-y-4">
  //     <div className="flex justify-between border-b border-white/10 pb-2">
  //       <span className="ui-font text-label-bold opacity-60 uppercase">
  //         MECHANICAL
  //       </span>
  //       <span className="body-font text-body-md">
  //         HVAC &amp; Plumbing Maintenance
  //       </span>
  //     </div>
  //     <div className="flex justify-between border-b border-white/10 pb-2">
  //       <span className="ui-font text-label-bold opacity-60 uppercase">
  //         ELECTRICAL
  //       </span>
  //       <span className="body-font text-body-md">
  //         Power Systems &amp; Grid Optimization
  //       </span>
  //     </div>
  //     <div className="flex justify-between border-b border-white/10 pb-2">
  //       <span className="ui-font text-label-bold opacity-60 uppercase">
  //         SECURITY
  //       </span>
  //       <span className="body-font text-body-md">
  //         Integrated Surveillance &amp; Access Control
  //       </span>
  //     </div>
  //   </div>
  // );

  // const sample5 = (
  //   <div className="grid grid-cols-1 gap-6">
  //     <div className="p-6 bg-surface-container flex items-center gap-6">
  //       <span className="material-symbols-outlined text-4xl text-primary">
  //         grid_view
  //       </span>
  //       <div>
  //         <h4 className="ui-font text-headline-sm">Bespoke Extrusions</h4>
  //         <p className="body-font text-sm opacity-80">
  //           Custom aluminum profiles for unique architectural identities.
  //         </p>
  //       </div>
  //     </div>
  //     <div className="p-6 bg-surface-container flex items-center gap-6">
  //       <span className="material-symbols-outlined text-4xl text-primary">
  //         wb_sunny
  //       </span>
  //       <div>
  //         <h4 className="ui-font text-headline-sm">Thermal Performance</h4>
  //         <p className="body-font text-sm opacity-80">
  //           Advanced glazing solutions reducing energy consumption by up to 30%.
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  const isList = variant === SSBulletPointVariant.LIST;
  const isIconList = variant === SSBulletPointVariant.ICON_LIST;
  const isCardList = variant === SSBulletPointVariant.CARD_LIST; // default
  const isCardListS = variant === SSBulletPointVariant.CARD_LIST_SECONDARY;
  const isRow = variant === SSBulletPointVariant.ROW;

  return (
    <div
      className={cn("flex flex-col gap-4", isRow && "flex-row items-center")}
    >
      {bulletpoints?.map((p) => {
        return (
          <React.Fragment key={p.title + p.icon}>
            <div
              className={cn(
                "group flex items-center gap-4",
                isRow && "border-s-4 border-primary px-4",
                isCardListS && "bg-secondary p-4",
              )}
            >
              {!!p.icon && (
                <span className={cn("p-2")}>
                  <Icon
                    name={p.icon || "MdInfo"}
                    className="text-4xl text-primary"
                  />
                </span>
              )}
              <div
                className={cn(
                  "flex flex-col gap-2",
                  isList && "w-full flex-row gap-4 justify-between",
                )}
              >
                <h6
                  className={cn(
                    "text-xl text-black font-semibold",
                    isList && "text-white/80 font-light",
                  )}
                >
                  {p.title}
                </h6>
                {!!p.description && (
                  <p
                    className={cn(
                      "text-sm",
                      isRow && "uppercase",
                      isList && "text-base text-white font-semibold",
                    )}
                  >
                    {p.description}
                  </p>
                )}
              </div>
            </div>
            <div
              className={cn(
                "flex last:hidden w-full h-px bg-black/5",
                isRow && "h-8 w-px",
                (isIconList || isCardListS) && "hidden",
              )}
            ></div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

interface SimpleServiceSectionProps extends Partial<Service> {
  title: string;
  variant?: SSVariant; // image position
  colorVariant?: SSColorVariant;
  bulletPointVariant?: SSBulletPointVariant;
  splitTitle?: boolean;
}

const SimpleServiceSection: React.FC<SimpleServiceSectionProps> = ({
  images,
  title,
  subTitle,
  description,
  content,
  blurb,
  links,
  bulletPoints,
  variant = SSVariant.RIGHT,
  colorVariant = SSColorVariant.WHITE,
  bulletPointVariant = SSBulletPointVariant.ICON_LIST,
  splitTitle = false,
}) => {
  const mainImage = images?.[0];

  // overrides
  const isBgPrimary = colorVariant === SSColorVariant.PRIMARY;
  const isBgSecondary = colorVariant === SSColorVariant.SECONDARY;
  const isLeftVariant = variant === SSVariant.LEFT;

  const renderedImage = (
    // ensure the ordering of the image and detail is the same on mobile using order-*
    <div className="group relative flex justify-center order-2 lg:order-0">
      <img
        alt={mainImage?.description || title}
        className="w-full max-w-6xl aspect-5/5 object-cover shadow-xl group-hover:scale-105 transition-all duration-500"
        src={mainImage?.url}
      />
    </div>
  );

  const renderedDetails = (
    <div className="max-w-xl flex flex-col gap-8 mx-auto py-8 px-4 lg:p-8">
      <div
        className={cn(
          "flex flex-col gap-4 text-primary",
          isBgPrimary && "text-white",
        )}
      >
        <h6 className="text-xs font-semibold uppercase tracking-widest">
          {subTitle}
        </h6>
        <h3 className="text-4xl font-bold">
          {splitTitle ? (
            <SplitTitle title={title} separator="&" hideBreak={false} />
          ) : (
            title
          )}
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <p
          className={cn(
            "text-black leading-relaxed",
            isBgPrimary && "text-white",
          )}
        >
          {content || description}
        </p>
        <p className="px-4 text-sm italic border-l-4 border-primary">{blurb}</p>
      </div>

      {!!bulletPoints?.length && (
        <ServiceBulletPoints
          bulletpoints={bulletPoints}
          variant={bulletPointVariant}
        />
      )}

      {!!links?.length && (
        <div className="flex gap-8 flex-wrap">
          {links.map((l) => (
            <Link
              key={l.title + l.url}
              className={cn(
                "flex items-center gap-2 p-1 text-base text-primary font-semibold uppercase border-b-2 border-primary hover:gap-4 transition-all duration-300",
                (isBgPrimary || isBgSecondary) && "text-white border-white",
              )}
              href={l.url}
            >
              {l.title} <ArrowRight />
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  // const imgLeftVariant = [renderedImage, renderedDetails];
  // const imgRightVariant = [renderedDetails, renderedImage];
  const imgLeftVariant = (
    <>
      {renderedImage}
      {renderedDetails}
    </>
  );
  const imgRightVariant = (
    <>
      {renderedDetails}
      {renderedImage}
    </>
  );

  let renderedSection = imgRightVariant;
  if (isLeftVariant) renderedSection = imgLeftVariant;

  return (
    <div
      className={cn(
        "w-full grid grid-cols-1 lg:grid-cols-2 items-center gap-12",
        isBgPrimary && "bg-primary",
        isBgSecondary && "bg-secondary",
      )}
    >
      {renderedSection}
    </div>
  );
};

export default SimpleServiceSection;
