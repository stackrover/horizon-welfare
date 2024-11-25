export class Hero {
  id: number;
  title: string;
  description: string;
  donateNowBtTitle: string;
  donateNowBtLink: string;
  watchVideoBtTitle: string;
  watchVideoBtLink: string;
  image: string;
  status: string;
  updatedBy: null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.donateNowBtTitle = data?.donate_now_bt_title;
    this.donateNowBtLink = data?.donate_now_bt_link;
    this.watchVideoBtTitle = data?.watch_video_bt_title;
    this.watchVideoBtLink = data?.watch_video_bt_link;
    this.image = data?.image;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
