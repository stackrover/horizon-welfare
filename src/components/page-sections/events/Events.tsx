"use client";

import { Event } from "@/components";

export function Events() {
  return (
    <section className="container mt-20">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mlg:grid-cols-3 2xl:grid-cols-4 2xl:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Event
            key={i}
            image="/images/donation.png"
            title="WASH PROJECT FOR RURAL AREA"
            date="Wed Feb 11 1987 00:00:00"
            description="We’ll get you directly seated and inside for you"
            id={1}
          />
        ))}
      </div>
    </section>
  );
}
