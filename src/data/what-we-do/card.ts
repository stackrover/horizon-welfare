export class WhatWeDoEventCard {
  id: number;
  eventId: number;
  firstName: string;
  lastName: string;
  profession: string;
  mobile: string;
  email: string;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.eventId = data.event_id;
    this.firstName = data.fname;
    this.lastName = data.lname;
    this.profession = data.profession;
    this.mobile = data.mobile;
    this.email = data.email;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
