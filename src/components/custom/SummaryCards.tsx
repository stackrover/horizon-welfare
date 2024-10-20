"use client";

import { SummaryCard } from "@/components";

import CountUp from "react-countup";
import {
  PeopleRaisedIcon,
  PoorPeopleSavedIcon,
  Volunteer,
} from "../../../public/icons";

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
          <span>
            <CountUp enableScrollSpy={true} scrollSpyOnce={true} end={100} />
            <span>+</span>
          </span>
        }
        subTitle="Projects Accomplished"
      />
      <SummaryCard
        icon={<Volunteer />}
        title={
          <span>
            <CountUp enableScrollSpy={true} scrollSpyOnce={true} end={1000} />
            <span>+</span>
          </span>
        }
        subTitle="People Established"
      />
    </section>
  );
}
