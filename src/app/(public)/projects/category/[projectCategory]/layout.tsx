import { auth } from "@/auth";
import { ProjectsByCategory } from "@/components";
import { getData } from "@/hooks/get-data";

export default function ProjectsCategoryPage() {
  return <ProjectsByCategory />;
}

export async function generateMetadata({
  params,
}: {
  params: { projectCategory: string };
}) {
  const projectCategory = params.projectCategory;
  const session = await auth();
  const token = session?.user?.token;

  const data = await getData(
    `/project/category/show/${projectCategory}`,
    token,
  );

  return {
    title: `${data?.results?.title} | Projects | Horizon Welfare`,
    description:
      "Learn about Horizon Welfare's mission to uplift underprivileged urban communities. Discover our initiatives, values, and how we strive to create lasting change through collective efforts.",
  };
}
