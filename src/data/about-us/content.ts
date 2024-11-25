export class AboutUsContent {
  id: number;
  title: string;
  focusTitle: string;
  descriptionTitle: string;
  description: string;
  videoTitle: string;
  videoLink: string;
  missionTitle: string;
  missionFocusTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionFocusTitle: string;
  visionDescription: string;
  status: string;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;

  constructor(data: any) {
    this.id = data.id;
    this.title = data.title;
    this.focusTitle = data.focus_title;
    this.descriptionTitle = data.description_title;
    this.description = data.description;
    this.videoTitle = data.video_title;
    this.videoLink = data.video_link;
    this.missionTitle = data.mission_title;
    this.missionFocusTitle = data.mission_focus_title;
    this.missionDescription = data.mission_description;
    this.visionTitle = data.vision_title;
    this.visionFocusTitle = data.vision_focus_title;
    this.visionDescription = data.vision_description;
    this.status = data.status;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
  }
}
