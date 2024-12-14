import {
  ContactUsForm,
  EventCardSection,
  WhatWeDoHeroSection,
  WhatWeDoKidSection,
  WhatWeDoProjectSection,
} from "@/components";

export default function WhatWeDo() {
  return (
    <main>
      {/* what we do hero section  */}
      <WhatWeDoHeroSection />
      {/* what we do section end */}

      {/* kids special needs section  */}
      <WhatWeDoKidSection />
      {/* kids special needs section end */}

      {/* project we have done section  */}
      <WhatWeDoProjectSection />
      {/* project we have done section end */}

      {/* out event section  */}
      <EventCardSection />
      {/* out event section end */}

      {/* contact form section  */}
      <section className="mx-auto mt-[100px] flex max-w-3xl flex-col gap-y-16 px-4">
        <h1 className="text-center text-[56px] font-bold leading-[68px] text-base-400">
          {"We'd love to hear from you"}
        </h1>
        <ContactUsForm />
      </section>
      {/* contact form section end */}
    </main>
  );
}
