"use client";

import { SocialIconData } from "@/data/footer/socialIcon";
import { useSWR } from "@/hooks/use-swr";
import _ from "lodash";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "../../../public/icons";

export default function ContactUsSocialIcons() {
  const { data, isLoading, refresh } = useSWR(
    `/contact/us/page/social/link/show`,
  );

  const serializedData = new SocialIconData(_.head(data?.data?.results));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex items-center gap-x-5">
      <Link href={serializedData.facebookLink} target="_blank">
        <FacebookIcon fill="#ffffff" />
      </Link>
      <Link href={serializedData.twitterLink} target="_blank">
        <TwitterIcon fill="#ffffff" />
      </Link>
      <Link href={serializedData.instagramLink} target="_blank">
        <LinkedinIcon fill="#ffffff" />
      </Link>
    </div>
  );
}
