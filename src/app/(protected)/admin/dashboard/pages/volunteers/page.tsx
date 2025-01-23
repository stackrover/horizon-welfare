import {
  JoinAsVolunteerCard,
  PackageHeroSection,
  ProjectList,
  ProjectsSection,
  SuccessStoriesSection,
} from "@/components";

export default function Volunteers() {
  return (
    <section className="p-8">
      <PackageHeroSection editable />
      {/* project section */}
      <ProjectsSection editable />
      {/* project section end  */}

      {/* success stories section  */}
      <SuccessStoriesSection editable />
      {/* success stories section  */}

      {/* project section  */}
      {/* <ProjectList /> */}
      {/* project section end */}

      {/* join as volunteer section  */}
      {/* <JoinAsVolunteerCard /> */}
      {/* join as volunteer section end */}
    </section>
  );
}
