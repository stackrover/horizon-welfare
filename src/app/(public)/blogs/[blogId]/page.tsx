import { auth } from "@/auth";
import { SingleBlogPage } from "@/components";
import { getData } from "../../../../hooks/get-data";

export default async function BlogDetails({
  params,
}: {
  params: { blogId: string };
}) {
  const session = await auth();
  const blogId = params.blogId;

  const userId = session?.user?.id;
  const token = session?.user?.token;

  const dataPromise = getData(`/blog/show/${blogId}`, token);

  return <SingleBlogPage dataPromise={dataPromise} />;
}
