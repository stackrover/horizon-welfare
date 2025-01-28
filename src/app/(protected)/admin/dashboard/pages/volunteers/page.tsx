import {
  JoinAsVolunteerCard,
  PackageHeroSection,
  ProjectList,
  ProjectsSection,
  SuccessStoriesSection,
} from "@/components";
import logger from "@/utils/logger";

export default function Volunteers() {
  logger.error("Erro: Rendering Volunteers page...");
  logger.info("Info: Rendering Volunteers page...");
  logger.warn("Warning: Rendering Volunteers page...");

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
