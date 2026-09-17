import { Role } from "@/types/role";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { MdSchedule } from "react-icons/md";

interface SimpleRoleCardProps extends Partial<Role> {}

const SimpleRoleCard: React.FC<SimpleRoleCardProps> = ({
  title,
  description,
  division,
  type,
  location,
  image,
  expiresAt,
}) => {
  return (
    // <Link href={link}>
    <div className="bg-white/5 hover:bg-white/10 transition-all duration-400 p-10 border-l-4 border-transparent hover:border-primary-container group cursor-pointer">
      <div className="group bg-white ">
        <div className="flex justify-between items-center mb-6">
          <span className="font-body-regular text-label-caps font-normal px-3 py-1 bg-primary-container/20 text-primary-container">
            {division}
          </span>
          <ArrowRight />
        </div>
        <h3 className="font-body-regular text-headline-lg text-[24px] font-normal mb-2">
          {title}
        </h3>
        <p className=" text-white/60 font-light mb-8">{description}</p>
        <div className="flex items-center gap-6 text-white/40 font-body-regular font-normal text-label-caps">
          <div className="flex items-center gap-2">
            <MapPin />
            {location}
          </div>
          <div className="flex items-center gap-2">
            {/* <span className="material-symbols-outlined text-sm" data-icon="schedule">
            schedule
          </span>{" "} */}
            <MdSchedule />
            {type}
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
};

export default SimpleRoleCard;
