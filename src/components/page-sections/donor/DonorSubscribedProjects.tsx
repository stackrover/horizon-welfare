"use client";

import { SubscriptionProjectCard } from "@/components";
import { DonorSubscribedProjectsData } from "@/data";
import React from "react";

export function DonorMonthlySubscribedPackages({
  donorSubscribedProjectsPromise,
}: {
  donorSubscribedProjectsPromise: Promise<any>;
}) {
  const data = React.use(donorSubscribedProjectsPromise);

  const serializedData =
    data?.results?.length > 0
      ? data.results.map((item: any) => new DonorSubscribedProjectsData(item))
      : [];

  console.log(serializedData);

  return (
    <main className="container">
      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center">
        <h1 className="text-2xl font-semibold leading-9 text-base-400 md:text-[30px]">
          Monthly Active Subscription
        </h1>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
        {serializedData?.length > 0 ? (
          serializedData.map((item: DonorSubscribedProjectsData) => (
            <SubscriptionProjectCard
              key={item.id}
              title={item.title}
              description={item.isEmergency ? "Emergency" : "Regular"}
              buttonText={"Monthly/" + item.subscriptionRate + "Tk"}
              imageUrl={item.thumbnail}
              linkUrl={`/donor/monthly-subscriptions/${item.packageId}`}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-lg font-medium text-base-400">
            No active subscription
          </p>
        )}
      </div>
    </main>
  );
}
