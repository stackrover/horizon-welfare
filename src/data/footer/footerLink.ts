export class FooterLink {
  id: number;
  footerLogo: string;
  footerPaymentImg: string;
  footerDescription: string;
  usefulLinkTitle1: string;
  usefulLink1: string;
  usefulLinkTitle2: string;
  usefulLink2: string;
  usefulLinkTitle3: string;
  usefulLink3: string;
  usefulLinkTitle4: string;
  usefulLink4: string;
  mainMenuTitle1: string;
  mainMenuLink1: string;
  mainMenuTitle2: string;
  mainMenuLink2: string;
  mainMenuTitle3: string;
  mainMenuLink3: string;
  mainMenuTitle4: string;
  mainMenuLink4: string;
  footerCredit: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.footerLogo = data.footer_logo;
    this.footerPaymentImg = data.footer_payment_img;
    this.footerDescription = data.footer_description;
    this.usefulLinkTitle1 = data.useful_link_title_1;
    this.usefulLink1 = data.useful_link_1;
    this.usefulLinkTitle2 = data.useful_link_title_2;
    this.usefulLink2 = data.useful_link_2;
    this.usefulLinkTitle3 = data.useful_link_title_3;
    this.usefulLink3 = data.useful_link_3;
    this.usefulLinkTitle4 = data.useful_link_title_4;
    this.usefulLink4 = data.useful_link_4;
    this.mainMenuTitle1 = data.main_menu_title_1;
    this.mainMenuLink1 = data.main_menu_link_1;
    this.mainMenuTitle2 = data.main_menu_title_2;
    this.mainMenuLink2 = data.main_menu_link_2;
    this.mainMenuTitle3 = data.main_menu_title_3;
    this.mainMenuLink3 = data.main_menu_link_3;
    this.mainMenuTitle4 = data.main_menu_title_4;
    this.mainMenuLink4 = data.main_menu_link_4;
    this.footerCredit = data.footer_credit;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
