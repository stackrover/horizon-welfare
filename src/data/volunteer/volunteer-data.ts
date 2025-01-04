export class VolunteerData {
  id: number;
  uid: number;
  balance: number;
  age: number;
  gender: string;
  division: string;
  district: string;
  thana: string;
  address: string;
  nationality: string;
  blood_group: string;
  profession: string;
  education: string;
  profile_image: string;
  bannar_image: string;
  f_name: string;
  l_name: string;
  email: string;
  mobile_number: string;

  constructor(data: any) {
    this.id = data.id;
    this.uid = data.uid;
    this.balance = data.balance || 0;
    this.age = data?.age ? +data.age : 0;
    this.gender = data.gender || "";
    this.division = data.division || "";
    this.district = data.district || "";
    this.thana = data.thana || "";
    this.address = data.address || "";
    this.nationality = data.nationality || "";
    this.blood_group = data.blood_group || "";
    this.profession = data.profession || "";
    this.education = data.education || "";
    this.profile_image = data.profile_image || "";
    this.bannar_image = data.bannar_image || "";
    this.f_name = data.user?.f_name || "";
    this.l_name = data.user?.l_name || "";
    this.email = data.user?.email || "";
    this.mobile_number = data.user?.mobile_number || "";
  }
}
