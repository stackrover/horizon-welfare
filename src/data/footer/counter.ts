export class Counter {
  id: number;
  number1: number;
  title1: string;
  icon1: string;
  number2: number;
  title2: string;
  icon2: string;
  number3: number;
  title3: string;
  icon3: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data?.id;
    this.number1 = data?.number_1;
    this.title1 = data?.title_1;
    this.icon1 = data?.icon_1;
    this.number2 = data?.number_2;
    this.title2 = data?.title_2;
    this.icon2 = data?.icon_2;
    this.number3 = data?.number_3;
    this.title3 = data?.title_3;
    this.icon3 = data?.icon_3;
    this.status = data?.status;
    this.updatedBy = data?.updated_by;
    this.createdAt = data?.created_at;
    this.updatedAt = data?.updated_at;
  }
}
