import Image from "next/image";
import Link from "next/link";
import { FacebookIcon, LinkedinIcon, TwitterIcon } from "../../../public/icons";

export function TeamMemberCard() {
  return (
    <div className="flex w-full flex-col items-center gap-y-4">
      <Image
        src="/images/team-member.png"
        alt="Team Member"
        height={320}
        width={296}
        className="w-full"
      />
      <>
        <h3 className="text-xl font-medium leading-8 text-base-400">
          Leonard John Davies
        </h3>
        <h5 className="text-xs font-medium leading-5 text-base-300">
          Co-founder, CEO
        </h5>
        <div className="flex w-fit items-center gap-5">
          <Link href={"/"}>
            <FacebookIcon />
          </Link>
          <Link href={"/"}>
            <TwitterIcon />
          </Link>
          <Link href={"/"}>
            <LinkedinIcon />
          </Link>
        </div>
      </>
    </div>
  );
}
