import { AboutCard } from "@/components";
import {
  CharityIcon1,
  CharityIcon2,
  LoveIcon,
  SolidarityIcon,
} from "../../../public/icons";

export function AboutCards() {
  return (
    <section className="container grid grid-cols-2 gap-8 pt-[100px]">
      <AboutCard
        icon={<CharityIcon1 />}
        title="Direct Help"
        desc="Charities empower people to make a difference, even if it is just in a small way"
      />
      <AboutCard
        icon={<SolidarityIcon />}
        title="Giving Information"
        desc="Charities empower people to make a difference, even if it is just in a small way"
      />
      <AboutCard
        icon={<LoveIcon />}
        title="Raising Awareness"
        desc="Charities empower people to make a difference, even if it is just in a small way"
      />
      <AboutCard
        icon={<CharityIcon2 />}
        title="Relieving Poverty"
        desc="Charities empower people to make a difference, even if it is just in a small way"
      />
    </section>
  );
}
