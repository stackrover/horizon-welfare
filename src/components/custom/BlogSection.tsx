import { BlogCard } from "@/components";
import { blogData } from "@/constants/blogData";

export function BlogSection() {
  return (
    <section className="mx-4 mt-[100px] grid grid-cols-1 gap-4 md:mx-10 xmd:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-6">
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
    </section>
  );
}
