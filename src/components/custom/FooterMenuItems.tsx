"use client";

import { FooterContactSection, FooterMenuLink, Logo } from "@/components";
import { FooterLink } from "../../data";
import EditableContent from "../forms/EditableContent";

export function FooterMenuItems({
  data,
  editable = false,
}: {
  data: FooterLink;
  editable?: boolean;
}) {
  return (
    <footer className="container grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {/* logo section  */}
      <div className="flex flex-col gap-y-5">
        <Logo logo={data?.footerLogo} />
        <h3 className="text-2xl font-medium leading-6 text-base-300">
          <EditableContent
            name={data.getInputName("footerDescription")}
            content={data.footerDescription}
            editable={editable}
          />
        </h3>
      </div>

      {/* link section 1  */}

      <div className="flex justify-start lg:justify-center">
        <nav>
          <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
            Useful Links
          </h2>
          <ul className="flex w-full flex-col gap-y-4">
            <EditableContent
              name={data.getInputName("usefulLinkTitle1")}
              content={data.usefulLinkTitle1}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("usefulLink1")}
                  content={data.usefulLink1}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.usefulLink1}
                    text={data?.usefulLinkTitle1}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("usefulLinkTitle2")}
              content={data.usefulLinkTitle2}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("usefulLink2")}
                  content={data.usefulLink2}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.usefulLink2}
                    text={data?.usefulLinkTitle2}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("usefulLinkTitle3")}
              content={data.usefulLinkTitle3}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("usefulLink3")}
                  content={data.usefulLink3}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.usefulLink3}
                    text={data?.usefulLinkTitle3}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("usefulLinkTitle4")}
              content={data.usefulLinkTitle4}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("usefulLink4")}
                  content={data.usefulLink4}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.usefulLink4}
                    text={data?.usefulLinkTitle4}
                  />
                </EditableContent>
              </div>
            </EditableContent>
          </ul>
        </nav>
      </div>

      {/* link section 1  */}
      <div className="flex justify-start lg:justify-center">
        <nav>
          <h2 className="mb-6 text-[22px] font-semibold leading-8 text-base-400 lg:text-[26px]">
            Main Menu
          </h2>
          <ul className="flex flex-col gap-y-4">
            <EditableContent
              name={data.getInputName("mainMenuTitle1")}
              content={data.mainMenuTitle1}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("mainMenuLink1")}
                  content={data.mainMenuLink1}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.mainMenuLink1}
                    text={data?.mainMenuTitle1}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("mainMenuTitle2")}
              content={data.mainMenuTitle2}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("mainMenuLink2")}
                  content={data.mainMenuLink2}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.mainMenuLink2}
                    text={data?.mainMenuTitle2}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("mainMenuTitle3")}
              content={data.mainMenuTitle3}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("mainMenuLink3")}
                  content={data.mainMenuLink3}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.mainMenuLink3}
                    text={data?.mainMenuTitle3}
                  />
                </EditableContent>
              </div>
            </EditableContent>

            <EditableContent
              name={data.getInputName("mainMenuTitle4")}
              content={data.mainMenuTitle4}
              editable={editable}
            >
              <div className="w-full">
                <EditableContent
                  name={data.getInputName("mainMenuLink4")}
                  content={data.mainMenuLink4}
                  editable={editable}
                  className="w-fit"
                >
                  <FooterMenuLink
                    href={data?.mainMenuLink4}
                    text={data?.mainMenuTitle4}
                  />
                </EditableContent>
              </div>
            </EditableContent>
          </ul>
        </nav>
      </div>

      {/* contact us section  */}
      <FooterContactSection editable={editable} data={data} />
    </footer>
  );
}
