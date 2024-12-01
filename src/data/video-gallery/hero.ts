export class VideoGalleryHero {
  id: number;
  title: string;
  description: string;
  donateBtnTitle: string;
  donateBtnLink: string;
  videoBtnTitle: string;
  videoBtnLink: string;
  image: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.description = data?.description;
    this.donateBtnTitle = data?.donate_btn_title;
    this.donateBtnLink = data?.donate_btn_link;
    this.videoBtnTitle = data?.video_btn_title;
    this.videoBtnLink = data?.video_btn_link;
    this.image = data?.image;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
