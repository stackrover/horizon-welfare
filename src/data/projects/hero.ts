export class ProjectHeroSection {
  id: number;
  title: string;
  description: string;
  focusTitle: string;
  image: string;
  btnTitle: string;
  btnLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.focusTitle = data.focus_title;
    this.image = data.image;
    this.btnTitle = data.btn_title;
    this.btnLink = data.btn_link;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
