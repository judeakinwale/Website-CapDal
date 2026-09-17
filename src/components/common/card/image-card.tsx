import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

interface ImageCardProps {
  image: string;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  link?: string;
  tag?: string | React.ReactNode;
  footer?: React.ReactNode;
}

export const ImageCard: React.FC<ImageCardProps> = ({
  image,
  title,
  description,
  link,
  tag,
  footer,
}) => {
  const imgAlt = typeof title === "string" ? title : "card image";
  const validTag =
    typeof tag === "string" ? <Badge variant="secondary">{tag}</Badge> : tag;

  const cardComponent = (
    <Card className="relative mx-auto w-full max-w-sm pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={image}
        alt={imgAlt}
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      <CardHeader>
        <CardAction>{validTag}</CardAction>
        <CardTitle>{title}</CardTitle>
        {!!description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {!!footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );

  if (link) return <Link href={link}>{cardComponent}</Link>;

  return cardComponent;
};
