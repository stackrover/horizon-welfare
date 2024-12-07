"use client";

import { DonationCard, JoinAsVolunteerCard, StoryCard } from "@/components";
import { Button } from "@/components/ui/button";
import { cardData } from "@/constants/cardData";
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
      <JoinAsVolunteerCard />
      {/* join as volunteer section end */}
    </main>
  );
}
