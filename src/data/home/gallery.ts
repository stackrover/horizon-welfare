export class Gallery {
  id: number;
  title: string;
  videoTitle: string;
  videoLink: string;
  imageTitle1: string;
  image1: string;
  imageTitle2: string;
  image2: string;
  imageTitle3: string;
  image3: string;
  imageTitle4: string;
  image4: string;
  imageTitle5: string;
  image5: string;
  imageTitle6: string;
  image6: string;
  imageTitle7: string;
  image7: string;
  imageTitle8: string;
  image8: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data?.id;
    this.title = data?.title;
    this.videoTitle = data?.video_title;
    this.videoLink = data?.video_link;
    this.imageTitle1 = data?.image_title_1;
    this.image1 = data?.image_1;
    this.imageTitle2 = data?.image_title_2;
    this.image2 = data?.image_2;
    this.imageTitle3 = data?.image_title_3;
    this.image3 = data?.image_3;
    this.imageTitle4 = data?.image_title_4;
    this.image4 = data?.image_4;
    this.imageTitle5 = data?.image_title_5;
    this.image5 = data?.image_5;
    this.imageTitle6 = data?.image_title_6;
    this.image6 = data?.image_6;
    this.imageTitle7 = data?.image_title_7;
    this.image7 = data?.image_7;
    this.imageTitle8 = data?.image_title_8;
    this.image8 = data?.image_8;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
