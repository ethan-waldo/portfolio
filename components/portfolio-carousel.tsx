'use client'

import * as React from "react";
import Image from 'next/image';
import { Card } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon, ChevronLeftIcon, Link2Icon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast"

const images = Array.from({ length: 20 }).map((_, index) => ({
  src: `/images/portfolio/${index + 1}.jpeg`,
  alt: `Image ${index + 1}`
}));

export function PortfolioCarousel() {
  const { toast } = useToast()
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(images.length);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const goToPreviousSlide = () => {
    if (api) {
      api.scrollTo(current - 2);
    }
  };

  const goToNextSlide = () => {
    if (api) {
      api.scrollTo(current);
    }
  };

  const copyPageLink = () => {
    const pageLink = window.location.href;
    navigator.clipboard.writeText(pageLink).then(() => {
      toast({title:'Page link copied to clipboard'});
    }).catch((error) => {
      console.error("Failed to copy page link: ", error);
      toast({title:'Failed to copy page link'});
    });
  };

  return (
    <div>
      <Carousel setApi={setApi} className="w-full max-w-screen-lg">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="w-full flex aspect-video items-center justify-center p-6">
                <AspectRatio ratio={16 / 9}>
                  <Image fill src={image.src} alt={image.alt} className="object-contain"/>
                </AspectRatio>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center">
        <Card className="flex flex-row gap-1 p-1 justify-between items-center mt-4 max-w-xs">
          <Button variant="ghost" size="icon" onClick={goToPreviousSlide}>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="icon">
            <Link href="https://github.com/ethan-waldo/portfolio">
              <GitHubLogoIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Separator orientation="vertical" />
          <div className="py-2 text-center text-sm text-muted-foreground">
            {current}/{count}
          </div>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="icon" onClick={copyPageLink}>
            <Link2Icon className="h-4 w-4" />
          </Button>
          <Separator orientation="vertical" />
          <Button variant="ghost" size="icon" onClick={goToNextSlide}>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
        </Card>
      </div>
    </div>
  );
}