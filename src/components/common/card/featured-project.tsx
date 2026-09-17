import { Project } from "@/types/project";
import { cn } from "@/lib/utils";

interface FeaturedProjectCardProps extends Partial<Project> {
  title: string;
  image: string;
  variant?: "wide" | "normal";
}

const FeaturedProjectCard: React.FC<FeaturedProjectCardProps> = ({
  title,
  image,
  description,
  category,
  completedAt,
  variant,
}) => {
  const isWide = variant === "wide" || !!description;

  return (
    <div
      className={cn(
        "relative group md:h-125 bg-secondary/5 filter text-white overflow-hidden",
        isWide ? "min-h-75 md:col-span-8" : "min-h-62.5 md:col-span-4",
      )}
    >
      <img
        alt={title}
        className="w-full h-full object-cover lg:group-hover:scale-110 lg:group-hover:blur-xs transition-all duration-1000"
        src={image}
      />
      <div className="absolute inset-0 flex flex-col justify-end gap-4 p-6 md:p-12 bg-linear-0 from-black/20 to-transparent md:opacity-0 lg:group-hover:opacity-100 transition-all duration-500 ">
        {!!category && (
          <span className="text-2xs font-bold uppercase tracking-widest">
            {category}
          </span>
        )}
        <h3 className="text-3xl font-bold">{title}</h3>
        {!!description && <p className="line-clamp-4">{description}</p>}
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
