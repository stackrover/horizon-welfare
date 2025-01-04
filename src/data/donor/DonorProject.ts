export class DonorSubscribedProject {
  id: number;
  donarUid: number;
  subscriptionPackageId: number;
  unsubscribed: string;
  createdAt: string;
  updatedAt: string;
  packageId: number;
  projectId: number;
  subscriptionRate: string;
  status: string;
  title: string;
  description: string;
  isEmergency: number;
  thumbnail: string;
  managers: Array<{
    id: number;
    projectId: number;
    managerName: string;
    email: string;
    mobile: string;
  }>;

  constructor(data: any) {
    this.id = data.id;
    this.donarUid = data.donar_uid;
    this.subscriptionPackageId = data.subscription_package_id;
    this.unsubscribed = data.unsubscribed;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.packageId = data.package?.id || 0;
    this.projectId = data.package?.project?.id || 0;
    this.subscriptionRate = data.package?.subscription_rate || "0.00";
    this.status = data.package?.status || "inactive";
    this.title = data.package?.project?.title || "";
    this.description = data.package?.project?.description || "";
    this.isEmergency = data.package?.project?.is_emergency || 0;
    this.thumbnail = data.package?.project?.thumbnail || "";
    this.managers =
      data.package?.project?.managers?.map((manager: any) => ({
        id: manager.id,
        projectId: manager.project_id,
        managerName: manager.manager_name,
        email: manager.email,
        mobile: manager.mobile,
      })) || [];
  }
}

export class DonorAvailableProject {
  packageId: number;
  projectId: number;
  subscriptionRate: string;
  status: string;
  title: string;
  description: string;
  isEmergency: number;
  thumbnail: string;
  managers: Array<{
    id: number;
    projectId: number;
    managerName: string;
    email: string;
    mobile: string;
  }>;

  constructor(data: any) {
    this.packageId = data.id;
    this.status = data.status;
    this.title = data?.project?.title;
    this.description = data?.project?.description;
    this.isEmergency = data?.project?.is_emergency;
    this.thumbnail = data?.project?.thumbnail;
    this.projectId = data?.project_id;
    this.subscriptionRate = data?.subscription_rate;
    this.managers =
      data?.project?.managers?.map((manager: any) => ({
        id: manager.id,
        projectId: manager.project_id,
        managerName: manager.manager_name,
        email: manager.email,
        mobile: manager.mobile,
      })) || [];
  }
}
