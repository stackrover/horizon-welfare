import { ProjectCard } from "./ProjectCard";

export function VolunteerProjectCard() {
  return (
    <section className="container mx-auto mt-[80px] flex flex-col gap-y-16">
      <h1 className="mt-6 text-5xl font-bold leading-[58px] text-base-400">
        Available Volunteering Projects
      </h1>

      <div className="grid grid-cols-3 gap-x-5 gap-y-6">
        <ProjectCard
          className="bg-[url(/images/project-done1.png)]"
          title="100 people need to volunteer food project"
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
  );
}
