import * as React from "react";

import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { SectionImage } from "@/types/section";

interface ImageCarouselProps {
  images: SectionImage[];
}

export const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  return (
    <Carousel
      className="h-full"
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
    >
      <CarouselContent className="h-full">
        {images?.map(({ url, title }, index) => (
          <CarouselItem key={index}>
            <img className="w-full h-full object-cover" src={url} alt={title} />
            {/* <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
            </div> */}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
};
