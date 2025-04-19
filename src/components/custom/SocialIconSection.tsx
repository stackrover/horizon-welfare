"use client";

import EditableContent from "@/components/forms/EditableContent";
import FormWrapper from "@/components/forms/FormWrapper";
import { SocialIconData } from "@/data/footer/socialIcon";
import { useSWR } from "@/hooks/use-swr";
import { cn } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
} from "@tabler/icons-react";
import _ from "lodash";
import toast from "react-hot-toast";
import { SocialIcon } from "./SocialIcon";

export function SocialIconSection({
  editable = false,
  className,
}: {
  editable?: boolean;
  className?: string;
}) {
  const { data, isLoading, refresh } = useSWR(
    `/contact/us/page/social/link/show`,
  );

  const serializedData = new SocialIconData(_.head(data?.data?.results));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <FormWrapper
      defaultValues={{
        ...serializedData.getFormData(),
      }}
      onSubmit={async (values) => {
        toast.promise(serializedData.updateData(values), {
          loading: "Loading...",
          success: (res) => {
            refresh();
            return res.message;
          },
          error: (res) => res.message,
        });
      }}
    >
      <div
        className={cn(
          "flex h-full items-center justify-between gap-x-4 rounded-2xl bg-base-0 p-4 shadow-[7px_20px_50px_rgba(0,0,0,0.09)] xmd:gap-x-5 xmd:p-8",
          className,
        )}
      >
        <EditableContent
          name={serializedData.getInputName("facebookLink")}
          content={serializedData.facebookLink}
          editable={editable}
        >
          <SocialIcon
            url={serializedData.facebookLink}
            icon={<IconBrandFacebook size={30} />}
          />
        </EditableContent>

        <EditableContent
          name={serializedData.getInputName("instagramLink")}
          content={serializedData.instagramLink}
          editable={editable}
        >
          <SocialIcon
            url={serializedData.instagramLink}
            icon={<IconBrandInstagram size={30} />}
          />
        </EditableContent>

        <EditableContent
          name={serializedData.getInputName("twitterLink")}
          content={serializedData.twitterLink}
          editable={editable}
        >
          <SocialIcon
            url={serializedData.twitterLink}
            icon={<IconBrandTwitter size={30} />}
          />
        </EditableContent>

        <EditableContent
          name={serializedData.getInputName("youtubeLink")}
          content={serializedData.youtubeLink}
          editable={editable}
        >
          <SocialIcon
            url={serializedData.youtubeLink}
            icon={<IconBrandYoutube size={30} />}
          />
        </EditableContent>
      </div>
    </FormWrapper>
  );
}
