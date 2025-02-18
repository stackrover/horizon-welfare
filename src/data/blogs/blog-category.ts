export class BlogCategory {
  private id: number;
  private title: string;
  private slug: string;
  private status: string;
  private createdBy: number;
  private updatedBy: number;

  original: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.original = data;
    this.id = data?.id;
    this.title = data?.title;
    this.status = data?.status;
    this.slug = data?.slug;
    this.createdBy = data?.created_by;
    this.updatedBy = data?.updated_by;
  }

  getId(): number {
    return this.id;
  }
  getTitle(): string {
    return this.title;
  }
  getSlug(): string {
    return this.slug;
  }
  getStatus(): string {
    return this.status;
  }
  getCreatedBy(): number {
    return this.createdBy;
  }
  getUpdatedBy(): number {
    return this.updatedBy;
  }
}
