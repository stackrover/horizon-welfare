import { auth } from "@/auth";
import { EventDetails } from "@/components";
import { getData } from "@/hooks/get-data";

export default function EventDetailsPage() {
  return <EventDetails />;
}

export async function generateMetadata({
  params,
}: {
  params: { eventId: string };
}) {
  const eventId = params.eventId;
  const session = await auth();
  const token = session?.user?.token;

  const data = await getData(`/event/show/${eventId}`, token);
  return {
    title: `${data?.results?.title} | Events | Horizon Welfare`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
