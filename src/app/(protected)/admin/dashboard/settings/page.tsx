"use client";

import { BottomFooter, SocialIconSection } from "@/components";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import dynamic from "next/dynamic";

const SummaryCards = dynamic(() => import("@/components/custom/SummaryCards"), {
  ssr: false,
});

export default function Settings() {
  return (
    <div>
      <div className="m-8 rounded-lg bg-base-0 p-8 shadow-md">
        <Accordion type="single" collapsible>
          <AccordionItem value="counter" className="border-b-0">
            <AccordionTrigger className="hover:no-underline">
              Summary Counter
            </AccordionTrigger>
            <AccordionContent>
              <SummaryCards className="shadow-none" editable={true} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="m-8 rounded-lg bg-base-0 p-8 shadow-md">
        <Accordion type="single" collapsible>
          <AccordionItem value="social-icons" className="border-b-0">
            <AccordionTrigger className="hover:no-underline">
              Social Icons
            </AccordionTrigger>
            <AccordionContent>
              <SocialIconSection className="shadow-none" editable={true} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="m-8 rounded-lg bg-base-0 p-8 shadow-md">
        <Accordion type="single" collapsible>
          <AccordionItem value="footer" className="border-b-0">
            <AccordionTrigger className="hover:no-underline">
              Footer
            </AccordionTrigger>
            <AccordionContent>
              <div className="mx-auto max-w-7xl">
                <BottomFooter editable={true} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
