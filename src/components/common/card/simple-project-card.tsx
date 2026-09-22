import { Project } from "@/types/project";
import { cn } from "cn";
import { MapPin } from "lucide-react";
import Link from "next/link";

interface SimpleProjectCardProps extends Partial<Project> {
  className?: string;
  link?: string;
}

const SimpleProjectCard: React.FC<SimpleProjectCardProps> = ({
  title,
  image,
  description,
  category,
  location,
  completedAt,
  className,
  link,
}) => {
  const dateCompleted = new Date(completedAt!).getFullYear();
  // width styling: min-w-64 max-w-md w-full
  return (
    <div
      className={cn(
        "group relative overflow-hidden w-full bg-black/2 hover:shadow-sm transition-all duration-300",
        className,
      )}
    >
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          className="w-full h-full object-cover greyscale-0 lg:grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          src={image}
        />
        {/* hover info */}
        <div className="absolute inset-0 flex justify-center items-end bg-linear-0 from-primary/95 to-primary/0 from-0% to-60% lg:translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-transform duration-500">
          <div className="w-full h-fit flex flex-col justify-end items-center gap-2 p-8 text-white text-center  group-hover:backdrop-blur-xs transition-all duration-500">
            <div className="w-full flex justify-between items-center gap-2 ">
              {category && (
                <span className="text-2xs font-bold uppercase">{category}</span>
              )}
              {location && (
                <span className="flex items-center gap-2 text-xs font-semibold">
                  <MapPin className="h-4! w-4!" />
                  {location}
                </span>
              )}
            </div>

            {title && (
              <div className="w-full text-lg font-bold text-start">{title}</div>
            )}

            {description && (
              <span className="text-xs font-semibold">{description}</span>
            )}

            {dateCompleted && (
              <div className="w-full border-t border-white/80">
                <span className="text-sm font-semibold">{dateCompleted}</span>
              </div>
            )}

            {link && (
              <div className="h-9 flex justify-center items-center">
                <Link
                  className="font-semibold border-b border-white p-1 uppercase hover:border-b-2 hover:font-bold transition-all duration-300"
                  href={link}
                >
                  View
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="hidden lg:flex z-10 p-4">
        {/* <h4 className="text-lg text-primary font-bold">{title}</h4> */}
        <p className="uppercase">{title}</p>
      </div>
    </div>
  );
};

export default SimpleProjectCard;
