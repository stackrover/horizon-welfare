export class SingleProject {
  id: number;
  title: string;
  slug: string;
  icon: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.slug = data.slug;
    this.icon = data.icon;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}

export class ProjectData2 {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: number;
  totalCollections: number;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.categoryId = data.category_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.goalAmount = parseFloat(data.goal_amount);
    this.totalCollections = parseFloat(data.total_collection);
    this.status = data.status;
  }
}

export class ProjectData {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  status: string;

  constructor(data: any) {
    this.id = data.id;
    this.categoryId = data.category_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.status = data.status;
  }
}
