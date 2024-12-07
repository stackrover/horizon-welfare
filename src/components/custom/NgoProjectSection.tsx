import { DonationCard } from "@/components";
import { cardData } from "@/constants/cardData";

export function NgoProjectSection() {
  return (
    <section className="container rounded-3xl px-4 py-4 shadow-[2px_9px_42px_rgb(0,0,0,0.08)] xmd:px-8 xmd:py-8 3xl:rounded-[40px] 3xl:px-12 3xl:py-16">
      <h1 className="mb-4 text-xl font-extrabold leading-9 text-base-400 md:text-2xl xmd:mb-8 xmd:leading-10 lg:text-3xl lg:leading-[50px] xl:text-4xl 2xl:text-5xl">
        MEET SOME OF OUR TOP <span className="text-primary">NGO</span> <br />{" "}
        PROJECTS
      </h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xmd:gap-6 xl:grid-cols-3">
        <DonationCard cardData={cardData} />
        <DonationCard cardData={cardData} />
        <DonationCard cardData={cardData} />
      </div>
    </section>
  );
}
