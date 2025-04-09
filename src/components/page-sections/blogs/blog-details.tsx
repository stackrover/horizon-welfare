"use client";

import { BlogComments } from "@/components";
import { IconUserCircle } from "@tabler/icons-react";
import Image from "next/image";
import React from "react";
import { Blog } from "../../../data";
import { getImageURL } from "../../../lib/utils";

export function SingleBlogPage({
  dataPromise,
  auth,
}: {
  dataPromise: Promise<any>;
  auth: any;
}) {
  const data = React.use(dataPromise);

  const blog: Blog = new Blog(data?.results);

  return (
    <main className="mx-auto max-w-[820px] p-5">
      <h4 className="w-fit rounded-md bg-gradient-to-br from-primary-light to-primary px-4 py-2 text-sm font-medium leading-5 text-base-0">
        {blog.getCategoryTitle()}
      </h4>
      <h1 className="mt-4 text-2xl font-semibold text-base-400 sm:text-3xl sm:leading-10 md:text-4xl">
        {blog.getTitle()}
      </h1>
      <div className="mt-6 flex items-center gap-2">
        <IconUserCircle size={28} className="rounded-full text-base-300" />
        <div className="flex items-center gap-6">
          <h5 className="text-sm font-medium leading-5 text-base-300">
            {blog.getAuthorName()}
          </h5>
          <h5 className="text-sm font-medium leading-5 text-base-300">
            {blog.getCreationDate()}
          </h5>
        </div>
      </div>

      {/* image section  */}
      <Image
        src={getImageURL(blog.getThumbnail())}
        alt="blog image"
        width={800}
        height={420}
        className="mt-6 h-fit w-full rounded-[20px]"
      />

      {/* blog text  */}
      <div
        className="py-10"
        dangerouslySetInnerHTML={{ __html: blog.getContent() }}
      />

      {/* others text section here  */}

      {/* comments section - auth required to comment */}
      <BlogComments auth={auth} blogId={blog.id} comments={blog.getComment()} />
    </main>
  );
}
