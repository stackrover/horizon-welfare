export class Services {
  id: number;
  title1: string;
  description1: string;
  image1: string;
  title2: string;
  description2: string;
  image2: string;
  title3: string;
  description3: string;
  image3: string;
  title4: string;
  description4: string;
  image4: string;
  status: string;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data?.id;
    this.title1 = data?.title_1;
    this.description1 = data?.description_1;
    this.image1 = data?.image_1;
    this.title2 = data?.title_2;
    this.description2 = data?.description_2;
    this.image2 = data?.image_2;
    this.title3 = data?.title_3;
    this.description3 = data?.description_3;
    this.image3 = data?.image_3;
    this.title4 = data?.title_4;
    this.description4 = data?.description_4;
    this.image4 = data?.image_4;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
