import { auth } from "@/auth";
import { VolunteerProjectCard } from "@/components";
import { config } from "@/utils/config";

export default async function page() {
  const session = await auth();
  const userId = session?.user?.id;

  return (
    <div>
      <VolunteerProjectCard
        title="Volunteered Projects "
        endpoint={`/volunteer/joined/project/list/${userId}`}
      />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: `Subscribed Projects - ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
