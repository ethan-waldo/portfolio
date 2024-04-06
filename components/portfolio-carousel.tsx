'use client'

import * as React from "react"
import Image from 'next/image'

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"
import { ChevronRightIcon, ChevronLeftIcon } from "@radix-ui/react-icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Importing images from a folder
const images = Array.from({ length: 10 }).map((_, index) => ({
  src: `/images/portfolio/${index + 1}.jpeg`, // Assuming images are named as 1.jpg, 2.jpg, etc.
  alt: `Image ${index + 1}`
}))

export function PortfolioCarousel() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(images.length)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const goToPreviousSlide = () => {
    if (api) {
      api.scrollTo(current - 2)
    }
  }

  const goToNextSlide = () => {
    if (api) {
      api.scrollTo(current)
    }
  }

  return (
    <div>
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <Card className="w-full flex aspect-video items-center justify-center relative p-6">
                <AspectRatio ratio={16 / 9}>
                  <Image fill src={image.src} alt={image.alt} blurDataURL="data:..." placeholder="blur" className="object-contain"/>
                </AspectRatio>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center">
      <Card className="flex flex-row gap-4 justify-between items-center mt-4 p-1 max-w-xs">
        <Button variant="ghost" size="icon" onClick={goToPreviousSlide}>
          <ChevronLeftIcon className="h-4 w-4" />
        </Button>
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} of {count}
        </div>
        <Button variant="ghost" size="icon" onClick={goToNextSlide}>
          <ChevronRightIcon className="h-4 w-4" />
        </Button>
      </Card>
      </div>
    </div>
  )
}
