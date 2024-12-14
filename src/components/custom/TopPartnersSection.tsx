"use client";

import { SectionWrapper } from "@/components";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Partner } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import AutoScroll from "embla-carousel-auto-scroll";
import Image from "next/image";

export function TopPartnersSection({ className }: { className?: string }) {
  const { data, isLoading, isError } = useSWR("/partner/list");

  const serializedData = data?.data?.results
    ? data.data.results.map(
        (item: Record<string, unknown>) => new Partner(item),
      )
    : [];

  return (
    <SectionWrapper
      isError={isError}
      isLoading={isLoading}
      errorClass="h-[220px]"
      loadingClass="h-[220px]"
      hidden={data?.data?.results?.length === 0}
      className={cn("mb-[160px]", className)}
    >
      <h1 className="text-center text-3xl font-extrabold leading-[50px] md:text-[40px]">
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
            {serializedData?.map((item: any) => (
              <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/6">
                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${item.logo}`}
                  alt="img"
                  height={56}
                  width={300}
                  className="h-[56px] w-fit"
                  quality={70}
                  loading="lazy"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Vg8AAnEBdzTCX3oAAAAASUVORK5CYII="
                  placeholder="blur"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </SectionWrapper>
  );
}
