import {
  JoinAsVolunteerCard,
  PackageHeroSection,
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

      {/* join as volunteer section  */}
      <JoinAsVolunteerCard editable />
      {/* join as volunteer section end */}
    </section>
  );
}
