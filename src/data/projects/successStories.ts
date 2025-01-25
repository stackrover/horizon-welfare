import { updateSuccessStories } from "@/app/actions/admin/pages/volunteers";

enum nameEnum {
  id = "id",
  title = "title",
  focusTitle = "focus_title",
  description = "description",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
  story1 = "story_1",
  story2 = "story_2",
  story3 = "story_3",
  story4 = "story_4",
  story5 = "story_5",
}

export class SuccessStories {
  formData: any;
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  story1?: {
    id?: number;
    thumbnail?: string;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: string;
  };
  story2?: {
    id?: number;
    thumbnail?: string;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: string;
  };
  story3?: {
    id?: number;
    thumbnail?: string;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: string;
  };
  story4?: {
    id?: number;
    thumbnail?: string;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: string;
  };
  story5?: {
    id?: number;
    thumbnail?: string;
    title?: string;
    slug?: string;
    description?: string;
    createdAt?: string;
  };
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
    this.story1 = {
      id: data.story_1?.id,
      thumbnail: data.story_1?.thumbnail,
      title: data.story_1?.title,
      slug: data.story_1?.slug,
      description: data.story_1?.description,
      createdAt: data.story_1?.created_at,
    };
    this.story2 = {
      id: data.story_2?.id,
      thumbnail: data.story_2?.thumbnail,
      title: data.story_2?.title,
      slug: data.story_2?.slug,
      description: data.story_2?.description,
      createdAt: data.story_2?.created_at,
    };
    this.story3 = {
      id: data.story_3?.id,
      thumbnail: data.story_3?.thumbnail,
      title: data.story_3?.title,
      slug: data.story_3?.slug,
      description: data.story_3?.description,
      createdAt: data.story_3?.created_at,
    };
    this.story4 = {
      id: data.story_4?.id,
      thumbnail: data.story_4?.thumbnail,
      title: data.story_4?.title,
      slug: data.story_4?.slug,
      description: data.story_4?.description,
      createdAt: data.story_4?.created_at,
    };
    this.story5 = {
      id: data.story_5?.id,
      thumbnail: data.story_5?.thumbnail,
      title: data.story_5?.title,
      slug: data.story_5?.slug,
      description: data.story_5?.description,
      createdAt: data.story_5?.created_at,
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

    // Populate the FormData object
    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    return updateSuccessStories(fd);
  }
}
