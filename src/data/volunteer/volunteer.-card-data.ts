export class VolunteerCardData {
  id: number | null;
  title: string;
  description: string;
  thumbnail: string;
  volunteer_need: number;

  constructor(data: any) {
    this.id = data.id || null;
    this.title = data.title || "";
    this.description = data.description || "";
    this.thumbnail = data.thumbnail || "";
    this.volunteer_need = data.volunteer_need || 0;
  }
}
