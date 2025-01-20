import { updateKidSection } from "@/app/actions/admin/pages/WhatWeDo";

export enum WhatWeDoKidEnum {
  id = "id",
  title = "title",
  serviceTitle1 = "service_title_1",
  serviceDescription1 = "service_description_1",
  serviceIcon1 = "service_icon_1",
  serviceTitle2 = "service_title_2",
  serviceDescription2 = "service_description_2",
  serviceIcon2 = "service_icon_2",
  serviceTitle3 = "service_title_3",
  serviceDescription3 = "service_description_3",
  serviceIcon3 = "service_icon_3",
  serviceTitle4 = "service_title_4",
  serviceDescription4 = "service_description_4",
  serviceIcon4 = "service_icon_4",
  serviceTitle5 = "service_title_5",
  serviceDescription5 = "service_description_5",
  serviceIcon5 = "service_icon_5",
  serviceTitle6 = "service_title_6",
  serviceDescription6 = "service_description_6",
  serviceIcon6 = "service_icon_6",
  serviceTitle7 = "service_title_7",
  serviceDescription7 = "service_description_7",
  serviceIcon7 = "service_icon_7",
  serviceTitle8 = "service_title_8",
  serviceDescription8 = "service_description_8",
  serviceIcon8 = "service_icon_8",
  status = "status",
  updatedBy = "updated_by",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class WhatWeDoKid {
  formData: any;
  id: number;
  title: string;
  serviceTitle1: string;
  serviceDescription1: string;
  serviceIcon1: string;
  serviceTitle2: string;
  serviceDescription2: string;
  serviceIcon2: string;
  serviceTitle3: string;
  serviceDescription3: string;
  serviceIcon3: string;
  serviceTitle4: string;
  serviceDescription4: string;
  serviceIcon4: string;
  serviceTitle5: string;
  serviceDescription5: string;
  serviceIcon5: string;
  serviceTitle6: string;
  serviceDescription6: string;
  serviceIcon6: string;
  serviceTitle7: string;
  serviceDescription7: string;
  serviceIcon7: string;
  serviceTitle8: string;
  serviceDescription8: string;
  serviceIcon8: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.formData = data;
    this.id = data.id;
    this.title = data.title;
    this.serviceTitle1 = data.service_title_1;
    this.serviceDescription1 = data.service_description_1;
    this.serviceIcon1 = data.service_icon_1;
    this.serviceTitle2 = data.service_title_2;
    this.serviceDescription2 = data.service_description_2;
    this.serviceIcon2 = data.service_icon_2;
    this.serviceTitle3 = data.service_title_3;
    this.serviceDescription3 = data.service_description_3;
    this.serviceIcon3 = data.service_icon_3;
    this.serviceTitle4 = data.service_title_4;
    this.serviceDescription4 = data.service_description_4;
    this.serviceIcon4 = data.service_icon_4;
    this.serviceTitle5 = data.service_title_5;
    this.serviceDescription5 = data.service_description_5;
    this.serviceIcon5 = data.service_icon_5;
    this.serviceTitle6 = data.service_title_6;
    this.serviceDescription6 = data.service_description_6;
    this.serviceIcon6 = data.service_icon_6;
    this.serviceTitle7 = data.service_title_7;
    this.serviceDescription7 = data.service_description_7;
    this.serviceIcon7 = data.service_icon_7;
    this.serviceTitle8 = data.service_title_8;
    this.serviceDescription8 = data.service_description_8;
    this.serviceIcon8 = data.service_icon_8;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }

  getFormData() {
    return this.formData;
  }

  getInputName(name: keyof typeof WhatWeDoKidEnum): string {
    return WhatWeDoKidEnum[name];
  }

  async updateData(formData: Record<string, string | Blob>) {
    const fd = new FormData();

    Object.keys(formData).forEach((key) => {
      const value = formData[key];
      if (typeof value === "string" || value instanceof Blob) {
        fd.append(key, value);
      } else {
        fd.append(key, "");
      }
    });

    return updateKidSection(fd);
  }
}
