import { SubscriptionProjectCard } from "@/components";
import { Button } from "@/components/ui/button";

export default function MonthlyAvailableSubscription() {
  return (
    <main className="container">
      <div className="mt-10 flex items-center gap-4">
        <h1 className="text-[30px] font-semibold leading-9 text-base-400">
          Monthly Available Subscription
        </h1>
        <Button> View More Projects</Button>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-6">
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
