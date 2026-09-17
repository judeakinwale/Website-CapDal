import { Identity, IdentityType } from "@/types/identity";
import Link from "next/link";
import { Icon } from "@/components/common/icon";
import * as FaIcon from "react-icons/fa";

interface SimpleIdentityCardProps extends Partial<Identity> {
  icon: string;
  title: string;
  type: IdentityType;
  content: string;
}

const SimpleIdentityCard: React.FC<SimpleIdentityCardProps> = ({
  icon,
  title,
  type,
  content,
}) => {
  return (
    <div className="group flex flex-col gap-4 bg-white/5 p-8 border border-white/10 hover:bg-white hover:text-primary transition-all duration-500">
      <Icon name={icon!} className="text-5xl" />
      <h3 className="text-lg text-white font-semibold group-hover:text-primary transition-all duration-500">
        {title}
      </h3>
      <p className="">{content}</p>
    </div>
  );
};

export default SimpleIdentityCard;
