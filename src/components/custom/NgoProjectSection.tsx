import { DonationCard } from "@/components";
import { cardData } from "@/constants/cardData";

export function NgoProjectSection() {
  return (
    <section className="container rounded-[40px] p-8 shadow-2xl">
      <h1 className="my-8 text-5xl font-extrabold leading-[50px] text-base-400">
        MEET SOME OF OUR TOP <span className="text-primary">NGO</span> <br />{" "}
        PROJECTS
      </h1>
      <div className="grid grid-cols-3 gap-6">
        <DonationCard cardData={cardData} />
        <DonationCard cardData={cardData} />
        <DonationCard cardData={cardData} />
      </div>
    </section>
  );
}
