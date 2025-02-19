import { updateDonorCtaBanner } from "@/app/actions/admin/pages/volunteers";

enum nameEnum {
  id = "id",
  title = "title",
  image = "image",
  volunteerBtnTitle = "volunteer_btn_title",
  volunteerBtnLink = "volunteer_btn_link",
  donateBtnTitle = "donate_btn_title",
  donateBtnLink = "donate_btn_link",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class JoinAsVolunteer {
  formData: any;
  id: number;
  title: string;
  image: string;
  volunteerBtnTitle: string;
  volunteerBtnLink: string;
  donateBtnTitle: string;
  donateBtnLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.volunteerBtnTitle = data.volunteer_btn_title;
    this.volunteerBtnLink = data.volunteer_btn_link;
    this.donateBtnTitle = data.donate_btn_title;
    this.donateBtnLink = data.donate_btn_link;
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

    return updateDonorCtaBanner(fd);
  }
}
