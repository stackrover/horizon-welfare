export class TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
  facebookLink: string;
  twitterLink: string;
  linkedinLink: string;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.position = data.position;
    this.image = data.image;
    this.facebookLink = data.facebook_link;
    this.twitterLink = data.twitter_link;
    this.linkedinLink = data.linkedin_link;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
