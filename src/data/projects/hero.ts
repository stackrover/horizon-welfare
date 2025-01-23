import { updateVolunteerPageHeroSectionData } from "@/app/actions/admin/pages/volunteers";

enum nameEnum {
  id = "id",
  title = "title",
  description = "description",
  focusTitle = "focus_title",
  image = "image",
  btnTitle = "btn_title",
  btnLink = "btn_link",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class ProjectHeroSection {
  id: number;
  title: string;
  description: string;
  focusTitle: string;
  image: string;
  btnTitle: string;
  btnLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  formData: any;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.focusTitle = data.focus_title;
    this.image = data.image;
    this.btnTitle = data.btn_title;
    this.btnLink = data.btn_link;
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

    return updateVolunteerPageHeroSectionData(fd);
  }
}
