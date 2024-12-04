export class AboutUsJourney {
  id: number;
  title: string;
  focusTitle: string;
  description: string;
  image: string;
  donationTitle: string;
  donationCount: string;
  volunteerTitle: string;
  volunteerCount: string;
  homeTitle: string;
  homeCount: string;
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
    this.donationTitle = data.donation_title;
    this.donationCount = data.donation_count;
    this.volunteerTitle = data.volunteer_title;
    this.volunteerCount = data.volunteer_count;
    this.homeTitle = data.home_title;
    this.homeCount = data.home_count;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
