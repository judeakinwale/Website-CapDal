import { News } from "@/types/news";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface SimpleNewsCardProps extends Partial<News> {
  title: string;
  image: string;
  link: string;
}

const SimpleNewsCard: React.FC<SimpleNewsCardProps> = ({
  image,
  title,
  tag,
  publishedAt,
  link,
}) => {
  return (
    // <Link href={link}>
    <article className="group w-full bg-white border border-transparent hover:border-primary transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          alt="Engineering team"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={image}
        />
      </div>
      <div className="flex flex-col gap-4 p-4 md:p-8">
        <div className="flex items-center gap-4">
          <span className="text-2xs text-primary font-semibold uppercase">
            {tag}
          </span>
          <span className="w-px h-4 bg-black/30"></span>
          <span className="text-2xs text-black/80 font-semibold uppercase">
            {String(publishedAt)}
          </span>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2">{title}</h3>
        <Link
          className="flex items-center gap-2 text-sm text-primary font-semibold uppercase hover:gap-4 transition-all duration-300 "
          href={link}
        >
          Read Article <ArrowRight />
        </Link>
      </div>
    </article>
    // </Link>
  );
};

export default SimpleNewsCard;
