import { AboutUsContentSection, AboutUsJourneySection } from "@/components";

export default function AboutUsPage() {
  return (
    <main className="p-20">
      <AboutUsContentSection editable />
      <AboutUsJourneySection editable />
    </main>
  );
}
