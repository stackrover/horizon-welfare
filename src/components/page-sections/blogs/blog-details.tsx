"use client";

import { BlogComments } from "@/components";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { BlogDetail } from "../../../data";

export function SingleBlogPage({ dataPromise }: { dataPromise: Promise<any> }) {
  const data = React.use(dataPromise);

  const serializedData = new BlogDetail(data?.results);
  console.log(serializedData);

  return (
    <main className="mx-auto max-w-[820px] p-5">
      <h4 className="w-fit rounded-md bg-gradient-to-br from-primary-light to-primary px-4 py-2 text-sm font-medium leading-5 text-base-0">
        WASH PROJECT
      </h4>
      <h1 className="mt-4 text-3xl font-semibold leading-10 text-base-400 md:text-4xl">
        Installation of water pump i n Rangpur Update and Brefing
      </h1>
      <div className="mt-6 flex items-center gap-2">
        <IconUserCircle size={28} className="rounded-full text-base-300" />
        <div className="flex items-center gap-6">
          <h5 className="text-sm font-medium leading-5 text-base-300">
            Riadul Islam
          </h5>
          <h5 className="text-sm font-medium leading-5 text-base-300">
            August 23, 2024
          </h5>
        </div>
      </div>

      {/* image section  */}
      <Image
        src="/images/blog-image.png"
        alt="blog image"
        width={800}
        height={420}
        className="mt-6 h-fit w-full"
      />

      {/* blog text  */}
      <p className="mt-8 text-base font-normal leading-8 text-base-400 md:text-lg">
        Traveling is an enriching experience that opens up new horizons, exposes
        us to different cultures, and creates memories that last a lifetime.
        However, traveling can also be stressful and overwhelming, especially if
        you dont plan and prepare adequately. In this blog article, well explore
        tips and tricks for a memorable journey and how to make the most of your
        travels. One of the most rewarding aspects of traveling is immersing
        yourself in the local culture and customs. This includes trying local
        cuisine, attending cultural events and festivals, and interacting with
        locals. Learning a few phrases in the local language can also go a long
        way in making connections and showing respect.
      </p>

      {/* others text section here  */}

      {/* comments section - auth required to comment */}
      <BlogComments />
    </main>
  );
}
