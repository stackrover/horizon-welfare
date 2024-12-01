export class JoinAsVolunteer {
  id: number;
  title: string;
  image: string;
  volunteerBtnTitle: string;
  volunteerBtnLink: string;
  donateBtnTitle: string;
  donateBtnLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.image = data.image;
    this.volunteerBtnTitle = data.volunteer_btn_title;
    this.volunteerBtnLink = data.volunteer_btn_link;
    this.donateBtnTitle = data.donate_btn_title;
    this.donateBtnLink = data.donate_btn_link;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
