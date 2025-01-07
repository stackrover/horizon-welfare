import { ManagerType } from "@/types/types";

export class VolunteerProjectDetailsData {
  projectId: number;
  categoryId: number;
  title: string;
  description: string;
  thumbnail: string;
  goalAmount: string;
  collectionDays: number;
  volunteerNeed: number;
  isEmergency: number;
  status: string;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
  totalVolunteers: number;
  remainingVolunteers: number;
  remainingDays: number;
  managers: ManagerType[];
  projectVolunteers: Array<{
    id: number;
    volunteerId: number;
    projectId: number;
    serialNumber: string;
    createdAt: string;
  }>;

  constructor(data: any) {
    this.projectId = data.id || 0;
    this.categoryId = data.category_id || 0;
    this.title = data.title || "";
    this.description = data.description || "";
    this.thumbnail = data.thumbnail || "";
    this.goalAmount = data.goal_amount || "0";
    this.collectionDays = data.collection_days || 0;
    this.volunteerNeed = data.volunteer_need || 0;
    this.isEmergency = data.is_emergency || 0;
    this.status = data.status || "";
    this.createdBy = data.created_by || 0;
    this.updatedBy = data.updated_by || 0;
    this.createdAt = data.created_at || "";
    this.updatedAt = data.updated_at || "";
    this.totalVolunteers = data.total_volunteers || 0;
    this.remainingVolunteers = data.remaining_volunteers || 0;
    this.remainingDays = data.remaining_days || 0;

    // Map managers array
    this.managers = (data.managers || []).map((manager: any) => ({
      id: manager.id || 0,
      projectId: manager.project_id || 0,
      managerName: manager.manager_name || "",
      email: manager.email || "",
      mobile: manager.mobile || "",
      link: manager.link || "",
      status: manager.status || "",
      createdAt: manager.created_at || "",
    }));

    // Map projectVolunteers array
    this.projectVolunteers = (data.project_volunteers || []).map(
      (volunteer: any) => ({
        id: volunteer.id || 0,
        volunteerId: volunteer.volunteer_id || 0,
        projectId: volunteer.project_id || 0,
        serialNumber: volunteer.serial_number || "",
        createdAt: volunteer.created_at || "",
      }),
    );
  }
}
