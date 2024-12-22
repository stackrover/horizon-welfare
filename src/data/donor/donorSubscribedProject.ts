export class DonorSubscribedProjectsData {
  id: number;
  donarUid: number;
  subscriptionPackageId: number;
  unsubscribed: any;
  createdAt: string;
  updatedAt: string;
  packageId: number;
  projectId: number;
  subscriptionRate: string;
  status: string;
  title: string;
  isEmergency: number;
  thumbnail: string;

  constructor(data: any) {
    this.id = data.id;
    this.donarUid = data.donar_uid;
    this.subscriptionPackageId = data.subscription_package_id;
    this.unsubscribed = data.unsubscribed;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.packageId = data.package.id;
    this.projectId = data.package.project_id;
    this.subscriptionRate = data.package.subscription_rate;
    this.status = data.package.status;
    this.title = data.package.project.title;
    this.isEmergency = data.package.project.is_emergency;
    this.thumbnail = data.package.project.thumbnail;
  }
}
