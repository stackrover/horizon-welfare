import {
  IconMailFilled,
  IconMapPinFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { ContactCard } from "./ContactCard";

export function FooterContactSection() {
  return (
    <div className="flex justify-start xl:justify-end">
      <div>
        <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
          Contact Us
        </h2>
        <div className="flex flex-col gap-y-4">
          <ContactCard
            icon={<IconPhoneFilled className="text-base-0" size={16} />}
            title="Call Us"
            subtitle="+8801700000000"
          />
          <ContactCard
            icon={<IconMailFilled className="text-base-0" size={16} />}
            title="Mail Us"
            subtitle="contact@example.com"
          />
          <ContactCard
            icon={<IconMapPinFilled className="text-base-0" size={16} />}
            title="Visit Us"
            subtitle="Dgaka 1202, Dhanmondi"
          />
        </div>
      </div>
    </div>
  );
}
