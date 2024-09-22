import { BlogCard } from "@/components";
import { blogData } from "@/constants/blogData";

export function BlogSection() {
  return (
    <section className="mx-10 mt-[100px] grid grid-cols-4 gap-x-6">
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
      <BlogCard cardData={blogData} />
    </section>
  );
}
