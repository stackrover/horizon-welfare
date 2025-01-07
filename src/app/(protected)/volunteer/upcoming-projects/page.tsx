import { VolunteerProjectCard } from "@/components";

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
