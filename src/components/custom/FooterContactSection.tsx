"use client";

import {
  IconMailFilled,
  IconMapPinFilled,
  IconPhoneFilled,
} from "@tabler/icons-react";
import { FooterLink } from "../../data";
import EditableContent from "../forms/EditableContent";
import { ContactCard } from "./ContactCard";

export function FooterContactSection({
  data,
  editable = false,
}: {
  data: FooterLink;
  editable?: boolean;
}) {
  return (
    <div className="flex justify-start xl:justify-end">
      <div>
        <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
          Contact Us
        </h2>
        <div className="flex flex-col gap-y-4">
          <EditableContent
            name={data.getInputName("mobileNumber")}
            content={data.mobileNumber}
            editable={editable}
          >
            <ContactCard
              icon={<IconPhoneFilled className="text-base-0" size={16} />}
              title="Call Us"
              subtitle={data.mobileNumber}
            />
          </EditableContent>

          <EditableContent
            name={data.getInputName("email")}
            content={data.email}
            editable={editable}
          >
            <ContactCard
              icon={<IconMailFilled className="text-base-0" size={16} />}
              title="Mail Us"
              subtitle={data.email}
            />
          </EditableContent>

          <EditableContent
            name={data.getInputName("address")}
            content={data.address}
            editable={editable}
          >
            <ContactCard
              icon={<IconMapPinFilled className="text-base-0" size={16} />}
              title="Visit Us"
              subtitle={data.address}
            />
          </EditableContent>
        </div>
      </div>
    </div>
  );
}
