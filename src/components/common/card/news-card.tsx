import { News } from "@/types/news";
import { ImageCard } from "./image-card";

interface NewsCardProps extends Partial<News> {
  title: string;
  image: string;
  link: string;
}

const NewsCard: React.FC<NewsCardProps> = ({
  image,
  title,
  tag,
  publishedAt,
  link,
}) => {
  return (
    <>
      <ImageCard title={title} image={image} />
    </>
  );
};

export default NewsCard;
