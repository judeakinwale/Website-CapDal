import { Role } from "@/types/role";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { MdSchedule } from "react-icons/md";

interface SimpleRoleCardProps extends Partial<Role> {
  link?: string;
  onClick?: () => void;
}

const SimpleRoleCard: React.FC<SimpleRoleCardProps> = ({
  title,
  description,
  division,
  type,
  location,
  // image,
  link,
  onClick,
  expiresAt,
}) => {
  const renderedCard = (
    <div
      className="group w-full h-full flex flex-col justify-between gap-8 bg-white/5 p-9 border-l-4 border-transparent cursor-pointer hover:bg-white/10 hover:border-primary transition-all duration-500"
      onClick={onClick}
    >
      <div className="flex justify-between items-center text-xs">
        <span className="bg-primary/20 px-3 py-1 text-primary font-semibold">
          {division}
        </span>
        <ArrowRight className="w-6 h-6 shrink-0" />
      </div>

      <div className="w-full h-full flex flex-col gap-4">
        <h3 className="text-xl text-white font-semibold">{title}</h3>
        <p className="font-sm font-light line-clamp-4">{description}</p>
      </div>

      <div className="flex items-center gap-8 text-white/40 text-sm">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 shrink-0" />
          {location}
        </div>
        <div className="flex items-center gap-2">
          <MdSchedule className="w-4 h-4 shrink-0" />
          {type}
        </div>
      </div>
    </div>
  );

  if (link) return <Link href={link}>{renderedCard}</Link>;

  return renderedCard;
};

export default SimpleRoleCard;
