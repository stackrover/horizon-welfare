import { updateMediaPageHeroSection } from "@/app/actions/admin/pages/media-center";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  description = "description",
  buttonLink = "button_link",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
  news1 = "news_1",
  news2 = "news_2",
  news3 = "news_3",
}

export class MediaCenterHero {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  buttonLink: string;
  news1: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  news2: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  news3: {
    id: number;
    thumbnail: string;
    title: string;
    slug: string;
    description: string;
    createdAt: string;
  };
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  formData: any;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.buttonLink = data.button_link;
    this.news1 = {
      id: data.news_1.id,
      thumbnail: data.news_1.thumbnail,
      title: data.news_1.title,
      slug: data.news_1.slug,
      description: data.news_1.description,
      createdAt: data.news_1.created_at,
    };
    this.news2 = {
      id: data.news_2.id,
      thumbnail: data.news_2.thumbnail,
      title: data.news_2.title,
      slug: data.news_2.slug,
      description: data.news_2.description,
      createdAt: data.news_2.created_at,
    };
    this.news3 = {
      id: data.news_3.id,
      thumbnail: data.news_3.thumbnail,
      title: data.news_3.title,
      slug: data.news_3.slug,
      description: data.news_3.description,
      createdAt: data.news_3.created_at,
    };
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

    // FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    return updateMediaPageHeroSection(fd);
  }
}
