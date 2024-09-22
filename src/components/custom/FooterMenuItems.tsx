import { FooterContactSection, FooterLinks, Logo } from "@/components";
import { mainMenus, usefulLinks } from "@/constants/footerMenu";

export function FooterMenuItems() {
  return (
    <footer className="container grid grid-cols-4 gap-x-10">
      {/* logo section  */}
      <div className="flex flex-col gap-y-5">
        <Logo />
        <h3 className="text-2xl font-medium leading-6 text-base-300">
          Savor the artistry where every dish is a culinary masterpiece
        </h3>
      </div>

      {/* link section 1  */}
      <FooterLinks menus={usefulLinks} />

      {/* link section 1  */}
      <FooterLinks menus={mainMenus} />

      {/* contact us section  */}
      <FooterContactSection />
    </footer>
  );
}
