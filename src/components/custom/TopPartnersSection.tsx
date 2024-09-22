"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { partnerLogos } from "@/constants/topPartnerSliderImages";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

export function TopPartnersSection() {
  return (
    <section className="mb-[160px]">
      <h1 className="text-center text-[40px] font-extrabold leading-[50px]">
        OUR TOP <span className="font-normal">Partners</span>
      </h1>
      <div className="mt-[60px]">
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          plugins={[
            AutoScroll({
              speed: 2,
              direction: "forward",
              stopOnInteraction: false,
            }),
          ]}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {partnerLogos.map((image) => (
              <CarouselItem
                key={image.id}
                className="md:basis-1/2 lg:basis-1/6"
              >
                <Image
                  src={image.url}
                  alt="img"
                  height={56}
                  width={300}
                  className="h-[56px] w-fit"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}
