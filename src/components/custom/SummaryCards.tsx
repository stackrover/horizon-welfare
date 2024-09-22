import {
  PeopleRaisedIcon,
  PoorPeopleSavedIcon,
  Volunteer,
} from "@/../public/icons";
import { SummaryCard } from "@/components";

export function SummaryCards() {
  return (
    <section className="container grid grid-cols-3 gap-x-20 py-[80px]">
      <SummaryCard
        icon={<PeopleRaisedIcon />}
        title="39000"
        subTitle="People Prevention of Cruelty"
      />
      <SummaryCard
        icon={<PoorPeopleSavedIcon />}
        title="100+"
        subTitle="Projects Accomplished"
      />
      <SummaryCard
        icon={<Volunteer />}
        title="1000+"
        subTitle="People Established"
      />
    </section>
  );
}
