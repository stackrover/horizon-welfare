"use client";

import * as React from "react";

import { HomePageCoverImage, LanguageChangeDropdown } from "@/components";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { produce, WritableDraft } from "immer";
import { Button } from "@/components/ui/button";
import { IconPlus } from "@tabler/icons-react";
import { startCase } from "lodash";
import { match } from "ts-pattern";
import { Textarea } from "@/components/ui/textarea";

type InputProps = {
  name: string;
  label?: string;
  type?: "text" | "number" | "textarea";
  placeholder?: string;
  value?: string;
  onChange: (
    prevState: WritableDraft<Record<string, any>>,
    value: string,
  ) => void;
};

export default function HomePage() {
  const [coverImage] = React.useState("/images/banner.png");
  const [pageData, setPageData] = React.useState<Record<string, any>>({
    language: "ENG",
    cover: "",
    heroCard: {
      heading: "Happiness comes from your action.",
      subHeading:
        "Be a part of the breakthrough and make someone’s dream come true.",
    },
    ngoProjectSection: {
      heading: "MEET SOME OF OUR TOP NGO PROJECTS",
    },
    services: {
      first: {
        heading: "Direct Help",
        description:
          "Charities empower people to make a difference, even if it is just in a small way",
      },

      second: {
        heading: "Giving Information",
        description:
          "Charities empower people to make a difference, even if it is just in a small way",
      },
      third: {
        heading: "Raising Awareness",
        description:
          "Charities empower people to make a difference, even if it is just in a small way",
      },
      fourth: {
        heading: "Relieving Poverty",
        description:
          "Charities empower people to make a difference, even if it is just in a small way",
      },
    },
  });

  // render input field
  const renderInput = ({
    name,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
  }: InputProps) => {
    return (
      <div className="flex flex-col space-y-2">
        {label ? <Label className="font-bold"> {label} </Label> : null}

        {match(type)
          .with("textarea", () => (
            <Textarea
              name={name}
              value={value}
              placeholder={placeholder}
              rows={5}
              onChange={(e) =>
                setPageData(produce((d) => onChange(d, e.target.value)))
              }
            />
          ))
          .otherwise(() => (
            <Input
              name={name}
              type={type}
              value={value}
              onChange={(e) =>
                setPageData(produce((d) => onChange(d, e.target.value)))
              }
              placeholder={placeholder}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="w-full p-8">
      <div className="flex items-center justify-between">
        <h1 className="mb-6 text-[38.4px] font-bold leading-[52.38px] tracking-[-0.14px]">
          Home page
        </h1>
      </div>

      <div className="container gap-4 rounded-lg border border-foreground/5 bg-background p-8">
        <div className="flex flex-col gap-6">
          <HomePageCoverImage
            preview={coverImage}
            setFile={(file) => {
              setPageData((p) => ({ ...p, cover: file }));
            }}
          />

          <div className="flex flex-col space-y-2">
            <Label className="font-bold"> Language </Label>
            <LanguageChangeDropdown
              value={pageData.language}
              setValue={(value) =>
                setPageData(
                  produce((d) => {
                    d.language = value;
                  }),
                )
              }
              className="max-w-[250px] bg-background"
            />
          </div>

          {/* Hero section card content */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-neutral-400">Hero Section</h2>

            {renderInput({
              name: "cardHeading",
              label: "Card heading",
              value: pageData.heroCard.heading,
              onChange: (state, value) => {
                state.heroCard.heading = value;
              },
            })}

            {renderInput({
              name: "cardSubHeading",
              label: "Card Sub-heading",
              value: pageData.heroCard.subHeading,
              onChange: (state, value) => {
                state.heroCard.subHei = value;
              },
            })}
          </div>

          {/* Homepage NGO projects */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-neutral-400">
              Home page NGO projects section
            </h2>

            {renderInput({
              name: "ngoSectionHeading",
              label: "Heading",
              value: pageData.ngoProjectSection.heading,
              onChange: (state, value) => {
                state.ngoProjectSection.heading = value;
              },
            })}

            <Button variant="ghost" className="w-fit bg-neutral-100">
              <IconPlus size={16} /> Add projects
            </Button>
          </div>

          {/* Home page service information */}
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-neutral-400">
              Home page services information
            </h2>

            {Object.keys(pageData.services).map((service) => (
              <React.Fragment key={service}>
                <h4 className="font-bold"> {startCase(service)} card </h4>
                {renderInput({
                  name: `${service}-heading`,
                  label: "Heading",
                  value: pageData.services[service].heading,
                  onChange: (state, value) => {
                    state.services[service].heading = value;
                  },
                })}

                {renderInput({
                  name: `${service}-description`,
                  type: "textarea",
                  label: "Description",
                  value: pageData.services[service].description,
                  onChange: (state, value) => {
                    state.services[service].description = value;
                  },
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
