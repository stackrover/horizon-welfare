import { updateAboutUsOurJourneySection } from "@/app/actions/admin/pages/about-us";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  description = "description",
  image = "image",
  donationTitle = "donation_title",
  donationCount = "donation_count",
  volunteerTitle = "volunteer_title",
  volunteerCount = "volunteer_count",
  homeTitle = "home_title",
  homeCount = "home_count",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class AboutUsJourney {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  image: string;
  donationTitle: string;
  donationCount: string;
  volunteerTitle: string;
  volunteerCount: string;
  homeTitle: string;
  homeCount: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  formData: any;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.image = data.image;
    this.donationTitle = data.donation_title;
    this.donationCount = data.donation_count;
    this.volunteerTitle = data.volunteer_title;
    this.volunteerCount = data.volunteer_count;
    this.homeTitle = data.home_title;
    this.homeCount = data.home_count;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    this.formData = data;
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

    // FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    return updateAboutUsOurJourneySection(fd);
  }
}
