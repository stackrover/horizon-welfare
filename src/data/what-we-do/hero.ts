export class WhatWeDoHero {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  image: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.description = data.description;
    this.image = data.image;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
