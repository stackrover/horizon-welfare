"use client";

import { BlogCard } from "@/components/custom/BlogCard";
import { Loader } from "@/components/custom/Loader";
import { SectionWrapper } from "@/components/custom/SectionWrapper";
import { Blog } from "@/data";
import { useSWR } from "@/hooks/use-swr";

export function Blogs({ url }: { url: string; editable?: boolean }) {
  const { data, isLoading, isError } = useSWR(url);

  if (isLoading) {
    return <Loader className="h-[540px]" />;
  }

  const serializedData =
    data?.data?.results?.length > 0
      ? data?.data.results.map((d: any) => new Blog(d))
      : [];

  return (
    <SectionWrapper
      isLoading={isLoading}
      isError={isError}
      errorClass="h-[540px]"
      loadingClass="h-[540px]"
      className="mx-4 mt-[100px] grid grid-cols-1 gap-4 gap-x-6 gap-y-8 md:mx-10 xmd:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-6"
      hidden={false}
    >
      {serializedData.length > 0
        ? serializedData.map((blog: Blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))
        : null}
    </SectionWrapper>
  );
}
