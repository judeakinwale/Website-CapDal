import { Service } from "@/types/service";
import Link from "next/link";

interface SimpleServiceCardProps extends Partial<Service> {
  title: string;
  image: string;
  link?: string;
}

const SimpleServiceCard: React.FC<SimpleServiceCardProps> = ({
  image,
  title,
  description,
  blurb,
  link,
}) => {
  return (
    // <Link href={link}>
    <div className="relative group w-full bg-white shadow-sm overflow-hidden hover:-translate-y-2 transition-all duration-500">
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

export default SimpleServiceCard;
