import { auth } from "@/auth";
import { SingleBlogPage } from "@/components";
import { getData } from "@/hooks/get-data";
import { config } from "@/utils/config";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const slug = params.slug;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const data = await getData(`/blog/show/slug/${slug}`, token);
  return {
    title: `${data?.results?.title} | ${data?.results?.category_title} | Blogs | ${config.get("app.name")}`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}

export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const session = await auth();
  const slug = params.slug;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(`/blog/show/slug/${slug}`, token);

  return <SingleBlogPage dataPromise={dataPromise} auth={session} />;
}
