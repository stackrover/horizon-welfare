export class DonorData {
  id: number;
  uid: number;
  balance: string;
  age: number;
  gender: string;
  address: string;
  nationality: string;
  profile_image: any;
  bannar_image: any;
  f_name: string;
  l_name: string;
  email: string;
  mobile_number: string;

  constructor(data: any) {
    this.id = data.id;
    this.uid = data.uid;
    this.balance = data.balance;
    this.age = data.age;
    this.gender = data.gender;
    this.address = data.address;
    this.nationality = data.nationality;
    this.profile_image = data.profile_image;
    this.bannar_image = data.bannar_image;
    this.f_name = data.user.f_name;
    this.l_name = data.user.l_name;
    this.email = data.user.email;
    this.mobile_number = data.user.mobile_number;
  }
}
