import { VolunteerProjectCard } from "@/components";
import { config } from "@/utils/config";

export default function page() {
  return (
    <div>
      <VolunteerProjectCard
        title="Upcoming Volunteered Projects "
        endpoint={`/volunteer/upcoming/project/list`}
      />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: `Upcoming Volunteered Projects - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
