import { updateVolunteerProjectSectionData } from "@/app/actions/admin/pages/volunteers";

enum SingleProjectFieldName {
  id = "id",
  title = "title",
  slug = "slug",
  icon = "icon",
  status = "status",
  createdBy = "created_by",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class SingleProject {
  formData: any;
  id: number;
  title: string;
  slug: string;
  icon: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.icon = data.icon;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  getFormData() {
    return this.formData;
  }

  getInputName(name: keyof typeof SingleProjectFieldName): string {
    return SingleProjectFieldName[name];
  }

  async updateData(formData: Record<string, string | Blob>) {
    // Create a new FormData instance
    const fd = new FormData();

    // Populate the FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    return updateVolunteerProjectSectionData(fd, this.id);
  }
}

export class ProjectData2 {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: number;
  totalCollections: number;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.categoryId = data.category_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.goalAmount = parseFloat(data.goal_amount);
    this.totalCollections = parseFloat(data.total_collection);
    this.status = data.status;
  }
}

export class ProjectData {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.categoryId = data.category_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.status = data.status;
  }
}
