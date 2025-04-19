import { updateSocialLink } from "@/app/actions/admin/pages/settings";

enum nameEnum {
  id = "id",
  facebookLink = "facebook_link",
  instagramLink = "instagram_link",
  twitterLink = "twitter_link",
  youtubeLink = "youtube_link",
  status = "status",
}

export class SocialIconData {
  id: number;
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
  youtubeLink: string;
  status: string;
  original: any;

  constructor(data: any = {}) {
    this.id = data.id || null;
    this.facebookLink = data.facebook_link || "";
    this.instagramLink = data.instagram_link || "";
    this.twitterLink = data.twitter_link || "";
    this.youtubeLink = data.youtube_link || "";
    this.status = data.status || "";

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

    return updateSocialLink(fd);
  }
}
