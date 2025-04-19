import { updateCounter } from "../../app/actions/admin/pages/settings";

enum nameEnum {
  id = "id",
  number1 = "number_1",
  title1 = "title_1",
  icon1 = "icon_1",
  number2 = "number_2",
  title2 = "title_2",
  icon2 = "icon_2",
  number3 = "number_3",
  title3 = "title_3",
  icon3 = "icon_3",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class Counter {
  id: number;
  number1: number;
  title1: string;
  icon1: string;
  number2: number;
  title2: string;
  icon2: string;
  number3: number;
  title3: string;
  icon3: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  original: any;

  constructor(data: any) {
    this.id = data?.id;
    this.number1 = data?.number_1;
    this.title1 = data?.title_1;
    this.icon1 = data?.icon_1;
    this.number2 = data?.number_2;
    this.title2 = data?.title_2;
    this.icon2 = data?.icon_2;
    this.number3 = data?.number_3;
    this.title3 = data?.title_3;
    this.icon3 = data?.icon_3;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;

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

    Object.entries(formData).forEach(([key, value]) => {
      if (
        value instanceof Blob ||
        typeof value === "string" ||
        typeof value === "number"
      ) {
        fd.append(key, value.toString());
      } else if (value !== undefined && value !== null) {
        fd.append(key, String(value));
      } else {
        fd.append(key, "");
      }
    });

    return updateCounter(fd);
  }
}
