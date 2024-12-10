import { JoinAsVolunteerCard, PackageHeroSection } from "@/components";

export default function ProjectPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <PackageHeroSection />
      {children}
      <JoinAsVolunteerCard />
    </div>
  );
}
