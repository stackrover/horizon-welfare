"use client";

import {
  AboutUsAwardSection,
  AboutUsContentSection,
  AboutUsJourneySection,
  AboutUsTeamSection,
} from "@/components";

export default function AboutUs() {
  return (
    <main>
      <AboutUsContentSection />

      {/* Awards & Recognitions section start  */}
      <AboutUsAwardSection />
      {/* Awards & Recognitions section end */}

      {/* money raising section  */}
      <AboutUsJourneySection />
      {/* money raising section end */}

      {/* our team section  */}
      <AboutUsTeamSection />
      {/* our team section end */}
    </main>
  );
}
