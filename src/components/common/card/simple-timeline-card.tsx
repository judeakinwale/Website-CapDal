import { Timeline } from "@/types/timeline";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Icon } from "../icon";

interface TimelineIconProps {
  icon: string;
  className?: string;
}

const TimelineIcon: React.FC<TimelineIconProps> = ({ icon, className }) => {
  return (
    <div className={cn("", className)}>
      <div className="w-12 h-12 flex items-center justify-center bg-white text-xl border-4 border-primary rounded-full">
        <Icon name={icon} className="text-primary" />
      </div>
    </div>
  );
};

interface SimpleTimelineCardProps extends Partial<Timeline> {
  variant?: "left" | "right";
}

const SimpleTimelineCard: React.FC<SimpleTimelineCardProps> = ({
  title,
  icon,
  year,
  content,
  variant,
}) => {
  const variantLeft = variant === "left";
  const variantRight = variant === "right";

  return (
    <div
      className={cn(
        "z-10 w-full flex items-center gap-8",
        variantLeft && "flex-row",
        variantRight && "flex-row-reverse",
      )}
    >
      <div className="w-full">
        <div
          className={cn(
            "bg-white space-y-2 p-4 border-l-4 border-primary shadow-lg",
            variantLeft && "",
            variantRight && "lg:border-l-0 lg:border-r-4 lg:text-right",
          )}
        >
          <div className="flex justify-between items-center">
            <div className="w-full flex flex-col gap-2">
              <span className="text-primary">{year}</span>
              <h4 className="text-black text-lg font-semibold">{title}</h4>
            </div>

            <div className={"lg:hidden"}>
              <TimelineIcon icon={icon!} className={""} />
            </div>
          </div>
          <p className="text-sm">{content}</p>
        </div>
      </div>

      <div
        className={cn(
          "hidden lg:flex w-full",
          variantLeft && "justify-start",
          variantRight && "justify-end",
        )}
      >
        <TimelineIcon icon={icon!} className={""} />
      </div>
    </div>
  );
};

export default SimpleTimelineCard;
