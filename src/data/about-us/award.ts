export class AwardSection {
  id: number;
  logo: string;
  title: string;
  year: string;
  venue: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.logo = data.logo;
    this.title = data.title;
    this.year = data.year;
    this.venue = data.venue;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
