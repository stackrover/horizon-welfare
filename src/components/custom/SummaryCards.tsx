"use client";

import {
  PeopleRaisedIcon,
  PoorPeopleSavedIcon,
  Volunteer,
} from "@/../public/icons";
import { SummaryCard } from "@/components";
import CountUp from "react-countup";

export default function SummaryCards() {
  return (
    <section className="container grid grid-cols-3 gap-x-20 py-[80px]">
      <SummaryCard
        icon={<PeopleRaisedIcon />}
        title={
          <CountUp enableScrollSpy={true} scrollSpyOnce={true} end={39000} />
        }
        subTitle="People Prevention of Cruelty"
      />
      <SummaryCard
        icon={<PoorPeopleSavedIcon />}
        title={
          <h1>
            <CountUp enableScrollSpy={true} scrollSpyOnce={true} end={100} />
            <span>+</span>
          </h1>
        }
        subTitle="Projects Accomplished"
      />
      <SummaryCard
        icon={<Volunteer />}
        title={
          <h1>
            <CountUp enableScrollSpy={true} scrollSpyOnce={true} end={1000} />
            <span>+</span>
          </h1>
        }
        subTitle="People Established"
      />
    </section>
  );
}
