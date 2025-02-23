enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export class ProjectCategory {
  private title: string;
  private icon: string;
  private slug: string;
  private id: number;
  private status: STATUS;
  private original: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.title = data?.title || "";
    this.icon = data?.icon || "";
    this.slug = data?.slug || "";
    this.id = data?.id || 0;
    this.status = Object.values(STATUS).includes(data?.status)
      ? data?.status
      : STATUS.PENDING;
    this.original = data;
  }

  // Getters
  getTitle(): string {
    return this.title;
  }

  getIcon(): string {
    return this.icon;
  }

  getSlug(): string {
    return this.slug;
  }

  getId(): number {
    return this.id;
  }

  getStatus(): STATUS {
    return this.status;
  }

  getOriginal(): Record<string, any> {
    return this.original;
  }

  // Utility method to check if category is active
  isActive(): boolean {
    return this.status === STATUS.ACTIVE;
  }
}
