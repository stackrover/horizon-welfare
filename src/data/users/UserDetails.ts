import { format } from "date-fns";

export class UserDetail {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly mobile: string;
    readonly status: string;
    readonly address: string;
    readonly age: number;
    readonly bannerImage: string;
    readonly profileImage: string;
    readonly createdAt: string;
    readonly gender: string;
    readonly nationality: string;

    constructor(data: any = {}) {
        this.id = data.id || 0;
        this.name = data.f_name + ' ' + data.l_name || "";
        this.email = data.email || "";
        this.mobile = data.mobile_number || "";
        this.status = data.status || "";
        this.address = data?.profile?.address || "";
        this.age = data?.profile?.age || 0;
        this.bannerImage = data?.profile?.bannar_image || "";
        this.profileImage = data?.profile?.profile_image || "";
        this.createdAt = data?.created_at ? format(data.created_at, 'dd/MM/yyyy hh:mm a') : "";
        this.gender = data?.profile?.gender || "";
        this.nationality = data?.profile?.nationality || "";
    }
}