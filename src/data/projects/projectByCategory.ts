export class ProjectByCategory {
  id: number;
  title: string;
  slug: string;
  icon: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  projects: Array<{
    id: number;
    categoryId: number;
    title: string;
    description: string;
    thumbnail: string;
    goalAmount: string;
    collectionDays: number;
    totalCollections: string;
    volunteerNeed: number;
    isEmergency: number;
    status: string;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
  }>;

  constructor(data: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.slug = data?.slug;
    this.icon = data?.icon;
    this.status = data?.status;
    this.createdBy = data?.created_by;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
    this.projects =
      data?.projects?.map((project: any) => ({
        id: project?.id,
        categoryId: project?.category_id,
        title: project?.title,
        description: project?.description,
        thumbnail: project?.thumbnail,
        goalAmount: project?.goal_amount,
        collectionDays: project?.collection_days,
        totalCollections: project?.total_collections,
        volunteerNeed: project?.volunteer_need,
        isEmergency: project?.is_emergency,
        status: project?.status,
        createdBy: project?.created_by,
        updatedBy: project?.updated_by,
        createdAt: project?.created_at,
        updatedAt: project?.updated_at,
      })) || [];
  }
}
