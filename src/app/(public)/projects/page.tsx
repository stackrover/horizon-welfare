"use client";

import {
  DonationCard,
  ProjectsSection,
  SuccessStoriesSection,
} from "@/components";
import { Button } from "@/components/ui/button";
import { cardData } from "@/constants/cardData";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Projects() {
  const pathname = usePathname();
  return (
    <main>
      {/* project section */}
      <ProjectsSection />
      {/* project section end  */}

      {/* success stories section  */}
      <SuccessStoriesSection />
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
      <section className="relative mx-auto mt-[100px] h-[384px] max-w-7xl rounded-[20px] bg-[url('/images/joinUs.png')] bg-cover bg-center before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-[20px] before:bg-black/50 before:content-['']">
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
