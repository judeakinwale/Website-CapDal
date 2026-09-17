import { Director } from "@/types/director";
import Link from "next/link";

interface SimpleDirectorCardProps extends Partial<Director> {}

const SimpleDirectorCard: React.FC<SimpleDirectorCardProps> = ({
  name,
  title,
  image,
  summary,
  link = "/",
}) => {
  // width styling: min-w-64 max-w-md w-full
  return (
    <div className="group relative overflow-hidden w-full bg-black/2 hover:shadow-sm transition-all duration-300">
      <div className="relative aspect-3/4 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0 grayscale"
          src={image}
        />
        {/* hover info */}
        <div className="absolute inset-0 flex justify-center items-end bg-linear-0 from-primary/90 to-primary/0 from-0% to-60% translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-transform duration-500">
          <div className="h-1/2 flex flex-col justify-end items-center gap-4 p-8 text-white text-center">
            <p className="font-semibold">{summary}</p>
            {link && (
              <div className="h-9 flex justify-center items-center">
                <Link
                  className="font-semibold border-b border-white p-1 uppercase hover:border-b-2 hover:font-bold transition-all duration-300"
                  href={link}
                >
                  View Bio
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="z-10 p-4">
        <h4 className="text-lg text-primary font-bold">{name}</h4>
        <p className="line-clamp-1 uppercase">{title}</p>
      </div>
    </div>
  );
};

export default SimpleDirectorCard;
