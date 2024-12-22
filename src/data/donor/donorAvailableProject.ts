export class DonorAvailableProjectData {
  id: number;
  projectId: number;
  subscriptionRate: string;
  status: string;
  title: string;
  isEmergency: number;
  thumbnail: string;

  constructor(data: any) {
    this.id = data.id;
    this.projectId = data.project_id;
    this.subscriptionRate = data.subscription_rate;
    this.status = data.status;
    this.title = data.project.title;
    this.isEmergency = data.project.is_emergency;
    this.thumbnail = data.project.thumbnail;
  }
}
