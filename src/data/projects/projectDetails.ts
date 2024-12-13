import { ManagerType, RecentDonationType } from "@/types/types";

export class Project {
  id: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: string;
  collectionDays: number;
  remainingDays: number;
  volunteerNeed: number;
  isEmergency: number;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  totalDonations: number;
  totalCollections: string;
  lastThreeDonations: Array<RecentDonationType>;
  category: {
    id: number;
    title: string;
    createdAt: string;
  };
  documents: Array<{
    id: number;
    projectId: number;
    title: string;
    link: string;
    status: string;
    createdAt: string;
  }>;
  images: Array<{
    id: number;
    projectId: number;
    title: string;
    link: string;
    status: string;
    createdAt: string;
  }>;
  managers: Array<ManagerType>;
  projectVolunteers: Array<{
    id: number;
    volunteerId: number;
    projectId: number;
    serialNumber: string;
    createdAt: string;
  }>;
  projectPaymentMethods: Array<{
    id: number;
    type: string;
    methodId: number;
    projectId: number;
    methodDetails: Array<{
      id: number;
      accountHolderName?: string;
      accountNumber?: number;
      bankName?: string;
      branchName?: string;
      accountType?: string;
      methodName?: string;
      username?: string;
      logo: string;
      qrCode: string;
    }>;
  }>;

  constructor(data: any) {
    this.id = data.id;
    this.categoryId = data.category_id;
    this.title = data.title;
    this.description = data.description;
    this.thumbnail = data.thumbnail;
    this.goalAmount = data.goal_amount;
    this.collectionDays = data.collection_days;
    this.remainingDays = data.remaining_days;
    this.volunteerNeed = data.volunteer_need;
    this.isEmergency = data.is_emergency;
    this.status = data.status;
    this.createdBy = data.created_by;
    this.updatedBy = data.updated_by;
    this.createdAt = data.created_at;
    this.updatedAt = data.updated_at;
    this.totalDonations = data.total_donations;
    this.totalCollections = data.total_collections;
    this.lastThreeDonations =
      data.last_three_donations?.map((donation: any) => ({
        uid: donation.uid,
        amount: donation.amount,
        fName: donation.f_name,
      })) || [];
    this.category = {
      id: data.category?.id,
      title: data.category?.title,
      createdAt: data.category?.created_at,
    };
    this.documents =
      data.documents?.map((doc: any) => ({
        id: doc.id,
        projectId: doc.project_id,
        title: doc.title,
        link: doc.link,
        status: doc.status,
        createdAt: doc.created_at,
      })) || [];
    this.images =
      data.images?.map((img: any) => ({
        id: img.id,
        projectId: img.project_id,
        title: img.title,
        link: img.link,
        status: img.status,
        createdAt: img.created_at,
      })) || [];
    this.managers =
      data.managers?.map((manager: any) => ({
        id: manager.id,
        projectId: manager.project_id,
        managerName: manager.manager_name,
        email: manager.email,
        mobile: manager.mobile,
        link: manager.link,
        status: manager.status,
        createdAt: manager.created_at,
      })) || [];
    this.projectVolunteers =
      data.project_volunteers?.map((volunteer: any) => ({
        id: volunteer.id,
        volunteerId: volunteer.volunteer_id,
        projectId: volunteer.project_id,
        serialNumber: volunteer.serial_number,
        createdAt: volunteer.created_at,
      })) || [];
    this.projectPaymentMethods =
      data.project_payment_methods?.map((method: any) => ({
        id: method.id,
        type: method.type,
        methodId: method.method_id,
        projectId: method.project_id,
        methodDetails:
          method.method_details?.map((detail: any) => ({
            id: detail.id,
            accountHolderName: detail.account_holder_name,
            accountNumber: detail.account_number,
            bankName: detail.bank_name,
            branchName: detail.branch_name,
            accountType: detail.account_type,
            methodName: detail.method_name,
            username: detail.username,
            logo: detail.logo,
            qrCode: detail.qr_code,
          })) || [],
      })) || [];
  }
}
