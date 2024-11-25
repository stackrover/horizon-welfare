"use client";

import { DonationCard, StoryCard } from "@/components";
import { Button } from "@/components/ui/button";
import { cardData } from "@/constants/cardData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Projects() {
  const pathname = usePathname();
  return (
    <main>
      {/* success stories section  */}
      <section className="container mt-[100px] grid grid-cols-3 gap-2">
        <div className="flex flex-col gap-y-4 p-8">
          <Button className="w-fit">SUCCESS STORIES</Button>
          <h2 className="text-4xl font-semibold leading-[44px] text-base-400">
            By you It’s happened
          </h2>
          <p className="text-base font-normal leading-6 text-base-300">
            Lorem Ipsum is simply dummy text of the printin typesetting dummy
            text ever when an unknown printer took a galley of type and
            scrambled a type specimen book.{" "}
          </p>
        </div>
        <StoryCard
          image="/images/project-image-2.png"
          title="ZAKAT PROJECTS"
          subtext="When you donate, you’re supporting effective care to children with special needs—an investment in the leaders of tomorrow."
          link={`${pathname}/1`}
        />
        <StoryCard
          image="/images/project-image-2.png"
          title="ZAKAT PROJECTS"
          subtext="When you donate, you’re supporting effective care to children with special needs—an investment in the leaders of tomorrow."
          link={`${pathname}/2`}
        />
        <StoryCard
          image="/images/project-image-2.png"
          title="ZAKAT PROJECTS"
          subtext="When you donate, you’re supporting effective care to children with special needs—an investment in the leaders of tomorrow."
          link={`${pathname}/3`}
        />
        <StoryCard
          image="/images/project-image-2.png"
          title="ZAKAT PROJECTS"
          subtext="When you donate, you’re supporting effective care to children with special needs—an investment in the leaders of tomorrow."
          link={`${pathname}/4`}
        />
        <StoryCard
          image="/images/project-image-2.png"
          title="ZAKAT PROJECTS"
          subtext="When you donate, you’re supporting effective care to children with special needs—an investment in the leaders of tomorrow."
          link={`${pathname}/5`}
        />
      </section>
      {/* success stories section  */}

      {/* project section  */}
      <section className="container mt-[100px]">
        <h1 className="my-8 text-[56px] font-extrabold leading-[67px] text-base-400">
          Your Donation May Change <br /> Someones Life
        </h1>
        <div className="grid grid-cols-3 gap-x-6 gap-y-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <DonationCard key={index} cardData={cardData} />
          ))}
        </div>
      </section>
      {/* project section end */}

      {/* join as volunteer section  */}
      <section className="relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-[url('/images/join-us.png')] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']">
        <div className="absolute left-0 top-0 z-10 mx-auto flex h-full w-full flex-col items-center justify-center gap-y-8 p-8">
          <h4 className="max-w-[900px] text-center text-5xl font-bold leading-[58px] text-base-0">
            You can contribute to provide a place for children with special
            needs!
          </h4>
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button className="w-fit">Join As A Volunteer</Button>
            </Link>
            <Link href="/">
              <Button variant="light" className="w-fit">
                Donate
              </Button>
            </Link>
          </div>
        </div>
      </section>
      {/* join as volunteer section end */}
    </main>
  );
}
