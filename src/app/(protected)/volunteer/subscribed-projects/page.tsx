import { auth } from "@/auth";
import { VolunteerProjectCard } from "@/components";

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
