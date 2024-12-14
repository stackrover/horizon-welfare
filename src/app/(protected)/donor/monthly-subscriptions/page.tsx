import { SubscriptionProjectCard } from "@/components";
import { Button } from "@/components/ui/button";

export default function MonthlySubscription() {
  return (
    <main className="container">
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold leading-9 text-base-400 md:text-[30px]">
          Monthly Active Subscription
        </h1>
        <Button className="w-fit"> View More Projects</Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
        <SubscriptionProjectCard
          title="General Donation For NGO"
          description="Lorem ipsum"
          buttonText="Monthly/300Tk"
          imageUrl="/images/monthly-subscription.png"
        />
      </div>
    </main>
  );
}
