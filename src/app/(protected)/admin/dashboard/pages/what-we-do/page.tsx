"use client";

import {
  ContactUsForm,
  EventCardSection,
  WhatWeDoHeroSection,
  WhatWeDoKidSection,
  WhatWeDoProjectSection,
} from "@/components";

export default function WhatWeDo() {
  return (
    <section className="container max-w-[1080px] p-8">
      {/* what we do hero section  */}
      <WhatWeDoHeroSection className="xmd:mt-[80px]" editable />
      {/* what we do section end */}

      {/* kids special needs section  */}
      <WhatWeDoKidSection />
      {/* kids special needs section end */}
    </section>
  );
}
