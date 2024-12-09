export class MediaCenterBanner {
  id: number;
  title: string;
  description: string;
  image: string;
  donateNowBtnTitle: string;
  donateNowBtnLink: string;
  watchVideoBtnTitle: string;
  watchVideoBtnLink: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.description = data.description;
    this.image = data.image;
    this.donateNowBtnTitle = data.donate_now_btn_title;
    this.donateNowBtnLink = data.donate_now_btn_link;
    this.watchVideoBtnTitle = data.watch_video_btn_title;
    this.watchVideoBtnLink = data.watch_video_btn_link;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
