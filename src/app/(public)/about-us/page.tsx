"use client";

import { AwardCard, OurJourneySummary, TeamMemberCard } from "@/components";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AwardIcon1 } from "../../../../public/icons";

const VideoPlayer = dynamic(
  () => import("@/components/page-sections/VideoPlayer"),
  { ssr: false },
);

export default function AboutUs() {
  return (
    <main>
      {/* know about us section  */}
      <section className="mx-auto mt-[150px] max-w-7xl py-4">
        <h5 className="mb-6 text-base font-bold leading-[18px] text-base-400">
          KNOW ABOUT US
        </h5>
        <div className="grid grid-cols-12 items-start">
          <h1 className="col-span-8 text-[56px] font-bold leading-[68px] text-base-400">
            We are a non-governmental organization
          </h1>
          <div className="col-span-4">
            <h3 className="text-xl font-bold leading-[30px] text-base-400">
              Aenean faucibus nibh et justo cursus id rutrum lorem imperdiet.
              Nunc ut sem vitae risus tristique posuere.
            </h3>
            <h5 className="text-base font-normal leading-6 text-base-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat. Suspendisse varius enim elementum tristique.
            </h5>
          </div>
        </div>
      </section>

      {/* our mission section  */}
      <section className="container">
        <VideoPlayer />

        <div className="rounded-lg border bg-gradient-to-r from-primary-light to-primary">
          <div className="z-0 mx-auto mb-[80px] mt-[300px] grid max-w-6xl grid-cols-2 gap-x-8">
            <div className="flex flex-col gap-y-4">
              <h4 className="text-base font-bold leading-5 text-base-0">
                OUR MISSION
              </h4>
              <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                We make sure to provide inclusive care for children with special
                needs
              </h2>
              <h5 className="text-base font-normal leading-6 text-base-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat. Aenean faucibus nibh et justo
                cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                tristique posuere.
              </h5>
            </div>
            <div className="flex flex-col gap-y-4">
              <h4 className="text-base font-bold leading-5 text-base-0">
                OUR MISSION
              </h4>
              <h2 className="text-[28px] font-bold leading-[42px] text-base-0">
                We make sure to provide inclusive care for children with special
                needs
              </h2>
              <h5 className="text-base font-normal leading-6 text-base-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat. Aenean faucibus nibh et justo
                cursus id rutrum lorem imperdiet. Nunc ut sem vitae risus
                tristique posuere.
              </h5>
            </div>
          </div>
        </div>
      </section>
      {/* our mission section end  */}

      {/* Awards & Recognitions section start  */}
      <section className="mx-auto mt-[100px] max-w-6xl">
        <h1 className="text-center text-5xl font-bold leading-[58px] text-base-400">
          Awards & Recognitions
        </h1>
        <div className="mt-[60px] grid grid-cols-4">
          <AwardCard
            icon={<AwardIcon1 className="mb-3" />}
            year="2021"
            name="Best NGO Award"
            place="Berlin, Germany"
          />
          <AwardCard
            icon={<AwardIcon1 className="mb-3" />}
            year="2018"
            name="Global Award"
            place="New York, USA"
          />
          <AwardCard
            icon={<AwardIcon1 className="mb-3" />}
            year="2014"
            name="CSN Award"
            place="New Delhi, India"
          />
          <AwardCard
            icon={<AwardIcon1 className="mb-3" />}
            year="2010"
            name="NGO of the year Award"
            place="Vienna, Austria"
          />
        </div>
      </section>
      {/* Awards & Recognitions section end */}

      {/* money raising section  */}
      <section className="container mt-[100px] grid grid-cols-12 gap-x-4 rounded-[20px] bg-primary px-8 py-16">
        <div className="col-span-6 ml-12 flex flex-col justify-center gap-y-4">
          <h4 className="text-base font-bold leading-5 text-base-0">
            OUT JOURNEY
          </h4>
          <h1 className="text-5xl font-bold leading-[58px] text-base-0">
            How we raised Money
          </h1>
          <p className="text-base font-normal leading-6 text-base-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat. Aenean faucibus nibh.
          </p>
          <div className="mt-4 flex gap-x-8">
            <OurJourneySummary count="34M+" text="Donation Received" />
            <OurJourneySummary count="400+" text="Volunteers" />
            <OurJourneySummary count="20+" text="Care homes" />
          </div>
        </div>
        <Image
          src="/images/money-raising.png"
          alt="Money-raising"
          height={448}
          width={612}
          className="col-span-6 w-full"
        />
      </section>
      {/* money raising section end */}

      {/* our team section  */}
      <section className="container mt-[100px] flex flex-col gap-y-8">
        <div className="mx-auto max-w-xl">
          <h1 className="text-center text-5xl font-bold leading-[58px] text-base-400">
            Meet Our Team
          </h1>
          <h4 className="mt-6 text-center text-base font-normal leading-[25px] text-base-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique.
          </h4>
        </div>
        <div className="grid grid-cols-4 gap-x-8 gap-y-12">
          {Array.from({ length: 8 }).map((_, i) => (
            <TeamMemberCard key={i} />
          ))}
        </div>
      </section>
      {/* our team section end */}
    </main>
  );
}
