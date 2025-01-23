"use client";

import { BlogComments } from "@/components";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { BlogDetail } from "../../../data";
import { getImageURL } from "../../../lib/utils";

export function SingleBlogPage({
  dataPromise,
  auth,
}: {
  dataPromise: Promise<any>;
  auth: any;
}) {
  const data = React.use(dataPromise);

  const serializedData = new BlogDetail(data?.results);
  console.log(serializedData);

  return (
    <main className="mx-auto max-w-[820px] p-5">
      <h4 className="w-fit rounded-md bg-gradient-to-br from-primary-light to-primary px-4 py-2 text-sm font-medium leading-5 text-base-0">
        {serializedData.category_title}
      </h4>
      <h1 className="mt-4 text-2xl font-semibold text-base-400 sm:text-3xl sm:leading-10 md:text-4xl">
        {serializedData.title}
      </h1>
      <div className="mt-6 flex items-center gap-2">
        <IconUserCircle size={28} className="rounded-full text-base-300" />
        <div className="flex items-center gap-6">
          <h5 className="text-sm font-medium leading-5 text-base-300">
            {serializedData.author_name}
          </h5>
          <h5 className="text-sm font-medium leading-5 text-base-300">
            {serializedData.created_at}
          </h5>
        </div>
      </div>

      {/* image section  */}
      <Image
        src={getImageURL(serializedData.thumbnail)}
        alt="blog image"
        width={800}
        height={420}
        className="mt-6 h-fit w-full rounded-[20px]"
      />

      {/* blog text  */}
      <p className="mt-8 text-sm font-normal leading-8 text-base-400 sm:text-base md:text-lg">
        {serializedData.description}
      </p>

      {/* others text section here  */}

      {/* comments section - auth required to comment */}
      <BlogComments auth={auth} comments={serializedData.comments} />
    </main>
  );
}
