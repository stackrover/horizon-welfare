import { updateVideoGallaryHero } from "@/app/actions/admin/pages/video-gallery";

enum nameEnum {
  id = "id",
  title = "title",
  description = "description",
  donateBtnTitle = "donate_btn_title",
  donateBtnLink = "donate_btn_link",
  videoBtnTitle = "video_btn_title",
  videoBtnLink = "video_btn_link",
  image = "image",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class VideoGalleryHero {
  id: number;
  title: string;
  description: string;
  donateBtnTitle: string;
  donateBtnLink: string;
  videoBtnTitle: string;
  videoBtnLink: string;
  image: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  formData: any;

  constructor(data: any) {
    this.formData = data;
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.donateBtnTitle = data?.donate_btn_title;
    this.donateBtnLink = data?.donate_btn_link;
    this.videoBtnTitle = data?.video_btn_title;
    this.videoBtnLink = data?.video_btn_link;
    this.image = data?.image;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
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

    return updateVideoGallaryHero(fd);
  }
}
