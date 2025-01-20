import { updateWhatWeDoHero } from "@/app/actions/admin/pages/WhatWeDo";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  description = "description",
  image = "image",
  status = "status",
  updatedBy = "updated_by",
  createdBy = "created_by",
  updatedAt = "updated_at",
}

export class WhatWeDoHero {
  formData: any;
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  image: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.image = data.image;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  getFormData() {
    return this.formData;
  }

  getInputName(name: keyof typeof nameEnum): string {
    return nameEnum[name];
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

    return updateWhatWeDoHero(fd);
  }
}
