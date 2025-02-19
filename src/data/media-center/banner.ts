import { updateMediaPageCTASection } from "@/app/actions/admin/pages/media-center";

enum nameEnum {
  id = "id",
  title = "title",
  description = "description",
  image = "image",
  donateNowBtnTitle = "donate_now_btn_title",
  donateNowBtnLink = "donate_now_btn_link",
  watchVideoBtnTitle = "watch_video_btn_title",
  watchVideoBtnLink = "watch_video_btn_link",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class MediaCenterBanner {
  id: number;
  title: string;
  description: string;
  image: string;
  donateNowBtnTitle: string;
  donateNowBtnLink: string;
  watchVideoBtnTitle: string;
  watchVideoBtnLink: string;
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
    this.image = data.image;
    this.donateNowBtnTitle = data.donate_now_btn_title;
    this.donateNowBtnLink = data.donate_now_btn_link;
    this.watchVideoBtnTitle = data.watch_video_btn_title;
    this.watchVideoBtnLink = data.watch_video_btn_link;
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

    return updateMediaPageCTASection(fd);
  }
}
