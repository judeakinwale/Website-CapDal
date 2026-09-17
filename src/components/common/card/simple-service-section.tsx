import { Service } from "@/types/service";
import Link from "next/link";

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

interface SimpleServiceSectionProps extends Partial<Service> {
  title: string;
  image: string;
  variant?: SSVariant;
  colorVariant?: SSColorVariant;
  bulletPointVariant?: SSBulletPointVariant;
}

// TODO: properly implement this

const SimpleServiceSection: React.FC<SimpleServiceSectionProps> = ({
  image,
  title,
  description,
  blurb,
  variant = "left",
  colorVariant = "white",
  bulletPointVariant = "",
}) => {
  return (
    // <Link href={link}>
    <div className="relative group w-full flex bg-white shadow-sm overflow-hidden hover:-translate-y-2 transition-all duration-500">
      <div className="aspect-video overflow-hidden">
        <img
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
          src={image}
        />
      </div>
      <div className="relative h-full flex flex-col justify-between gap-4">
        <div className="h-full flex flex-col gap-2 p-8 group-hover:blur transition-all duration-300">
          <h3 className="text-primary text-2xl font-bold">{title}</h3>
          <p className="text-sm line-clamp-2">{description}</p>
        </div>
        <div className="absolute inset-0 w-full h-full flex items-center justify-center p-8 bg-primary opacity-30 translate-y-full transition-all duration-300  group-hover:opacity-90 group-hover:translate-0">
          <p className="text-white text-center text-sm">{blurb}</p>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default SimpleServiceSection;
