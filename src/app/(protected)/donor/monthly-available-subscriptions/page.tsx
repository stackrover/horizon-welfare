import { SubscriptionProjectCard } from "@/components";
import { Button } from "@/components/ui/button";

// TODO: hello todo 

export default function MonthlyAvailableSubscription() {
  return (
    <main className="container">
      <div className="mt-10 flex flex-col items-start gap-4 xmd:flex-row xmd:items-center">
        <h1 className="text-2xl font-semibold leading-9 text-base-400 md:text-[30px]">
          Monthly Available Subscription
        </h1>
        <Button> View More Projects</Button>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
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
