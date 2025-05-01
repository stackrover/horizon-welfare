import { format } from "date-fns";

export enum STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

export class ProjectCategory {
  readonly title: string;
  readonly icon: string;
  readonly slug: string;
  readonly id: number;
  readonly status: STATUS;
  readonly createdAt: string;
  readonly original: Record<string, any>;

  constructor(data: Record<string, any>) {
    this.title = data?.title || "";
    this.icon = data?.icon || "";
    this.slug = data?.slug || "";
    this.id = data?.id || 0;
    this.status = Object.values(STATUS).includes(data?.status)
      ? data?.status
      : STATUS.PENDING;
    this.createdAt = data?.created_at
      ? format(data.created_at, "dd/MM/yyyy hh:mm a")
      : "";
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
