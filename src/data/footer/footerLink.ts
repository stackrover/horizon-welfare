import { updateSettings } from "@/app/actions/admin/pages/settings";

enum nameEnum {
  id = "id",
  footerLogo = "footer_logo",
  footerPaymentImg = "footer_payment_img",
  footerDescription = "footer_description",
  mobileNumber = "mobile_number",
  email = "email",
  address = "address",
  usefulLinkTitle1 = "useful_link_title_1",
  usefulLink1 = "useful_link_1",
  usefulLinkTitle2 = "useful_link_title_2",
  usefulLink2 = "useful_link_2",
  usefulLinkTitle3 = "useful_link_title_3",
  usefulLink3 = "useful_link_3",
  usefulLinkTitle4 = "useful_link_title_4",
  usefulLink4 = "useful_link_4",
  usefulLinkTitle5 = "useful_link_title_5",
  usefulLink5 = "useful_link_5",
  usefulLinkTitle6 = "useful_link_title_6",
  usefulLink6 = "useful_link_6",
  mainMenuTitle1 = "main_menu_title_1",
  mainMenuLink1 = "main_menu_link_1",
  mainMenuTitle2 = "main_menu_title_2",
  mainMenuLink2 = "main_menu_link_2",
  mainMenuTitle3 = "main_menu_title_3",
  mainMenuLink3 = "main_menu_link_3",
  mainMenuTitle4 = "main_menu_title_4",
  mainMenuLink4 = "main_menu_link_4",
  mainMenuTitle5 = "main_menu_title_5",
  mainMenuLink5 = "main_menu_link_5",
  mainMenuTitle6 = "main_menu_title_6",
  mainMenuLink6 = "main_menu_link_6",
  footerCredit = "footer_credit",
  status = "status",
  createdAt = "created_at",
  updatedAt = "updated_at",
}

export class FooterLink {
  id: number;
  footerLogo: string;
  footerPaymentImg: string;
  footerDescription: string;
  mobileNumber: string;
  email: string;
  address: string;
  usefulLinkTitle1: string;
  usefulLink1: string;
  usefulLinkTitle2: string;
  usefulLink2: string;
  usefulLinkTitle3: string;
  usefulLink3: string;
  usefulLinkTitle4: string;
  usefulLink4: string;
  usefulLinkTitle5: string;
  usefulLink5: string;
  usefulLinkTitle6: string;
  usefulLink6: string;
  mainMenuTitle1: string;
  mainMenuLink1: string;
  mainMenuTitle2: string;
  mainMenuLink2: string;
  mainMenuTitle3: string;
  mainMenuLink3: string;
  mainMenuTitle4: string;
  mainMenuLink4: string;
  mainMenuTitle5: string;
  mainMenuLink5: string;
  mainMenuTitle6: string;
  mainMenuLink6: string;
  footerCredit: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  original: any;

  constructor(data: any) {
    this.id = data.id;
    this.footerLogo = data.footer_logo;
    this.footerPaymentImg = data.footer_payment_img;
    this.footerDescription = data.footer_description;
    this.mobileNumber = data.mobile_number;
    this.email = data.email;
    this.address = data.address;
    this.usefulLinkTitle1 = data.useful_link_title_1;
    this.usefulLink1 = data.useful_link_1;
    this.usefulLinkTitle2 = data.useful_link_title_2;
    this.usefulLink2 = data.useful_link_2;
    this.usefulLinkTitle3 = data.useful_link_title_3;
    this.usefulLink3 = data.useful_link_3;
    this.usefulLinkTitle4 = data.useful_link_title_4;
    this.usefulLink4 = data.useful_link_4;
    this.usefulLinkTitle5 = data.useful_link_title_5;
    this.usefulLink5 = data.useful_link_5;
    this.usefulLinkTitle6 = data.useful_link_title_6;
    this.usefulLink6 = data.useful_link_6;
    this.mainMenuTitle1 = data.main_menu_title_1;
    this.mainMenuLink1 = data.main_menu_link_1;
    this.mainMenuTitle2 = data.main_menu_title_2;
    this.mainMenuLink2 = data.main_menu_link_2;
    this.mainMenuTitle3 = data.main_menu_title_3;
    this.mainMenuLink3 = data.main_menu_link_3;
    this.mainMenuTitle4 = data.main_menu_title_4;
    this.mainMenuLink4 = data.main_menu_link_4;
    this.mainMenuTitle5 = data.main_menu_title_5;
    this.mainMenuLink5 = data.main_menu_link_5;
    this.mainMenuTitle6 = data.main_menu_title_6;
    this.mainMenuLink6 = data.main_menu_link_6;
    this.footerCredit = data.footer_credit;
    this.status = data.status;
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

    return updateSettings(fd);
  }
}
