import {
  ContactUsForm,
  EventCard,
  ProjectCard,
  SpecialNeedCard,
} from "@/components";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import {
  BuildingIcon,
  DogIcon,
  PlantIcon,
  TreeInHandIcon,
  WaterDropIcon,
  WaveIcon,
} from "../../../../public/icons";

export default function WhatWeDo() {
  return (
    <main>
      {/* what we do section  */}
      <section className="mx-auto mt-[150px] grid max-w-7xl grid-cols-2">
        <div className="flex max-w-xl flex-col justify-center gap-y-6">
          <h5 className="text-base font-bold leading-[18px] text-base-400">
            WHAT WE DO
          </h5>
          <h1 className="text-[56px] font-bold leading-[68px] text-base-400">
            We are working cross country
          </h1>
          <h5 className="text-base font-normal leading-6 text-base-300">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            varius enim in eros elementum tristique. Duis cursus, mi quis
            viverra ornare, eros dolor interdum nulla, ut commodo diam libero
            vitae erat.
          </h5>
        </div>
        <div className="flex justify-end">
          <Image
            src="/images/what-we-do.png"
            alt="What We Do"
            height={384}
            width={476}
          />
        </div>
      </section>
      {/* what we do section end */}

      {/* kids special needs section  */}
      <section className="container mt-[100px] rounded-lg bg-gradient-to-r from-primary-light to-primary p-[80px]">
        <h1 className="text-5xl font-bold leading-[56px] text-base-0">
          What we do for our kids with special needs
        </h1>
        <div className="mt-[60px] grid grid-cols-3 gap-x-4 gap-y-12">
          <SpecialNeedCard
            icon={<BuildingIcon />}
            title="Family support"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
          <SpecialNeedCard
            icon={<WaveIcon />}
            title="Health benefits"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
          <SpecialNeedCard
            icon={<TreeInHandIcon />}
            title="Education"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
          <SpecialNeedCard
            icon={<WaterDropIcon />}
            title="Basic amenities"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
          <SpecialNeedCard
            icon={<DogIcon />}
            title="Therapy"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
          <SpecialNeedCard
            icon={<PlantIcon />}
            title="Public outreach"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique."
          />
        </div>
      </section>
      {/* kids special needs section end */}

      {/* project we have done section  */}
      <section className="mx-auto mt-[80px] flex max-w-7xl flex-col gap-y-16">
        <div className="max-w-2xl">
          <h4 className="text-base font-bold leading-[18px] text-base-400">
            PROJECT WE HAVE DONE
          </h4>
          <h1 className="mt-6 text-5xl font-bold leading-[58px] text-base-400">
            We are creating a place where children with special needs can thrive
          </h1>
        </div>
        <div className="grid grid-cols-3 gap-x-5 gap-y-6">
          <ProjectCard
            className="bg-[url(/images/project-done1.png)]"
            title="Mission smile 1k: Outdoor charity"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
          <ProjectCard
            className="bg-[url(/images/project-done2.png)]"
            title="Weekly excursions"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
          <ProjectCard
            className="bg-[url(/images/project-done3.png)]"
            title="Monthly public awareness"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
          <ProjectCard
            className="bg-[url(/images/project-done1.png)]"
            title="Mission smile 1k: Outdoor charity"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
          <ProjectCard
            className="bg-[url(/images/project-done2.png)]"
            title="Weekly excursions"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
          <ProjectCard
            className="bg-[url(/images/project-done3.png)]"
            title="Monthly public awareness"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros."
            path="/"
          />
        </div>
      </section>
      {/* project we have done section end */}

      {/* out event section  */}
      <section className="mx-auto mt-[100px] max-w-7xl">
        <div className="flex items-center gap-x-5">
          <h2 className="mb-1 whitespace-nowrap text-[40px] font-medium leading-[56px] text-base-400">
            Our Events
          </h2>
          <Separator className="shrink" />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-5">
          <EventCard
            day="25"
            month="APR"
            title="Seminar: Caring for children with autism"
            url="/"
          />
          <EventCard
            day="25"
            month="APR"
            title="Seminar: Caring for children with autism"
            url="/"
          />
          <EventCard
            day="25"
            month="APR"
            title="Seminar: Caring for children with autism"
            url="/"
          />
          <EventCard
            day="25"
            month="APR"
            title="Seminar: Caring for children with autism"
            url="/"
          />
        </div>
      </section>
      {/* out event section end */}

      {/* contact form section  */}
      <section className="mx-auto mt-[100px] flex max-w-3xl flex-col gap-y-16">
        <h1 className="text-center text-[56px] font-bold leading-[68px] text-base-400">
          {"We'd love to hear from you"}
        </h1>
        <ContactUsForm />
      </section>
      {/* contact form section end */}
    </main>
  );
}
