export class EventData {
  id: number;
  projectId: number;
  title: string;
  status: string;
  scheduleDate: string;
  scheduleTime: string;
  location: string;
  thumbnail: string;

  constructor(data: any) {
    this.id = data.id;
    this.projectId = data.project_id;
    this.title = data.title;
    this.status = data.status;
    this.scheduleDate = data.schedule_date;
    this.scheduleTime = data.schedule_time;
    this.location = data.location;
    this.thumbnail = data.thumbnail;
  }
}
