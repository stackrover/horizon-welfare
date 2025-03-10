"use client";

import DataTable from "@/components/data-table/Table";
import TeamMemberAddButton from "@/components/page-sections/admin/teams/TeamMemberAddButton";
import { Button } from "@/components/ui/button";
import { TeamMember } from "@/data";
import { useSWR } from "@/hooks/use-swr";
import { getImageURL } from "@/lib/utils";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import Image from "next/image";

export default function OurTeams() {
  const { data, isLoading, refresh } = useSWR("/about/page/team/member/list");

  if (isLoading) {
    return <div className="py-10 text-center">Loading...</div>;
  }

  const teams = data?.data?.results?.map((team: any) => new TeamMember(team));

  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      <div className="col-span-12 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold"> Team Members </h1>
        <TeamMemberAddButton refresh={refresh} />
      </div>

      <div className="col-span-12">
        <DataTable<TeamMember>
          data={teams || []}
          columns={[
            {
              id: "id",
              header: "#",
              accessorKey: "id",
              maxSize: 60,
            },
            {
              id: "image",
              header: "Avatar",
              accessorKey: "image",
              maxSize: 60,
              cell: (i) => (
                <Image
                  src={getImageURL(i.getValue() as string)}
                  alt=""
                  width={36}
                  height={36}
                  sizes="36px"
                  loading="lazy"
                />
              ),
            },
            {
              id: "name",
              header: "Name",
              accessorKey: "name",
              cell: (i) => (
                <span className="block flex-1 font-semibold">
                  {i.getValue() as string}
                </span>
              ),
            },

            {
              id: "position",
              header: "Position",
              accessorKey: "position",
              cell: (i) => i.getValue(),
            },
            {
              id: "social",
              header: "Social Link",
              cell: ({ row }) => (
                <div className="flex items-center gap-1.5">
                  {[
                    {
                      name: "Facebook",
                      icon: IconBrandFacebook,
                      url: row.original.facebookLink,
                    },
                    {
                      name: "Linkedin",
                      icon: IconBrandLinkedin,
                      url: row.original.linkedinLink,
                    },
                    {
                      name: "Twitter",
                      icon: IconBrandTwitter,
                      url: row.original.twitterLink,
                    },
                  ].map((item) => (
                    <Button
                      key={item.name}
                      asChild
                      variant="ghost"
                      size="icon"
                      className="size-8 hover:bg-slate-200"
                    >
                      <a href={item.url}>
                        <item.icon size={20} />
                      </a>
                    </Button>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
