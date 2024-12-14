interface Document {
  id: number;
  eventId: number;
  title: string;
  link: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

interface Image {
  id: number;
  eventId: number;
  title: string;
  link: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

interface EventDetailData {
  id: number;
  project_id: number;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  map_link: string;
  meet_link: string;
  zoom_link: string;
  schedule_date: string;
  schedule_time: string;
  status: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
  documents: Array<Document>;
  images: Array<Image>;
}

export class EventDetail {
  id: number;
  projectId: number;
  title: string;
  description: string;
  thumbnail: string;
  location: string;
  mapLink: string;
  meetLink: string;
  zoomLink: string;
  scheduleDate: string;
  scheduleTime: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  documents: Array<Document>;
  images: Array<Image>;

  constructor(data: EventDetailData) {
    this.id = data.id;
    this.projectId = data.project_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.location = data.location;
    this.mapLink = data.map_link;
    this.meetLink = data.meet_link;
    this.zoomLink = data.zoom_link;
    this.scheduleDate = data.schedule_date;
    this.scheduleTime = data.schedule_time;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;

    // Map nested arrays if needed
    this.documents = data?.documents?.map((doc) => ({
      ...doc,
    }));

    this.images = data?.images?.map((img) => ({
      ...img,
    }));
  }
}
