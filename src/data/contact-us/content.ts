import { updateContactUsHero } from "../../app/actions/admin/pages/ContactUs";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  description = "description",
  mobileNumber = "mobile_number",
  phoneNumber = "phone_number",
  email = "email",
  headOfficeAddress = "head_office_address",
  branchOfficeAddress = "branch_office_address",
  mapLink = "map_link",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class ContactUsContent {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  mobileNumber: string;
  phoneNumber: string;
  email: string;
  headOfficeAddress: string;
  branchOfficeAddress: string;
  mapLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  original: any;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.mobileNumber = data.mobile_number;
    this.phoneNumber = data.phone_number;
    this.email = data.email;
    this.headOfficeAddress = data.head_office_address;
    this.branchOfficeAddress = data.branch_office_address;
    this.mapLink = data.map_link;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    this.original = data;
  }

  getFormData() {
    return this.original;
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

    return updateContactUsHero(fd);
  }
}
