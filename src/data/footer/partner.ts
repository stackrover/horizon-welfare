export class Partner {
  id: number;
  title: string;
  logo: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.logo = data.logo;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
