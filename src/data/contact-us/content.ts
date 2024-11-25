export class ContactUsContent {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  mobileNumber: string;
  phoneNumber: string;
  email: string;
  headOfficeAddress: string;
  branchOfficeAddress: string;
  mapLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.mobileNumber = data.mobile_number;
    this.phoneNumber = data.phone_number;
    this.email = data.email;
    this.headOfficeAddress = data.head_office_address;
    this.branchOfficeAddress = data.branch_office_address;
    this.mapLink = data.map_link;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
