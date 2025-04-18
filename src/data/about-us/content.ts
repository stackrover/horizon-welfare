import { updateAboutUsHeroSection } from "../../app/actions/admin/pages/about-us";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  descriptionTitle = "description_title",
  description = "description",
  videoTitle = "video_title",
  videoLink = "video_link",
  missionTitle = "mission_title",
  missionFocusTitle = "mission_focus_title",
  missionDescription = "mission_description",
  visionTitle = "vision_title",
  visionFocusTitle = "vision_focus_title",
  visionDescription = "vision_description",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class AboutUsContent {
  id: number;
  title: string;
  focusTitle: string;
  descriptionTitle: string;
  description: string;
  videoTitle: string;
  videoLink: string;
  missionTitle: string;
  missionFocusTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionFocusTitle: string;
  visionDescription: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  formData: any;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.descriptionTitle = data.description_title;
    this.description = data.description;
    this.videoTitle = data.video_title;
    this.videoLink = data.video_link;
    this.missionTitle = data.mission_title;
    this.missionFocusTitle = data.mission_focus_title;
    this.missionDescription = data.mission_description;
    this.visionTitle = data.vision_title;
    this.visionFocusTitle = data.vision_focus_title;
    this.visionDescription = data.vision_description;
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

    return updateAboutUsHeroSection(fd);
  }
}
