export class AboutUsTeamMemberTitle {
  id: number;
  title: string;
  description: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
