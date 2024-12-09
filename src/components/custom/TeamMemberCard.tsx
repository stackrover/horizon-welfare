import { TeamMember } from "@/data";
import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "../../../public/icons";

interface TeamMemberCardProps {
  item: TeamMember;
}

export function TeamMemberCard({ item }: TeamMemberCardProps) {
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <Image
        src={`${process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL}/${item.image}`}
        alt={item.name}
        height={320}
        width={296}
        className="w-full"
      />
      <>
        <h3 className="text-xl font-medium leading-8 text-base-400">
          {item.name}
        </h3>
        <h5 className="text-xs font-medium leading-5 text-base-300">
          {item.position}
        </h5>
        <div className="flex w-fit items-center gap-5">
          <Link href={item.facebookLink}>
            <FacebookIcon />
          </Link>
          <Link href={item.twitterLink}>
            <TwitterIcon />
          </Link>
          <Link href={item.linkedinLink}>
            <LinkedinIcon />
          </Link>
        </div>
      </>
    </div>
  );
}
