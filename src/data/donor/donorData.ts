import { format, parseISO } from "date-fns";
import { Transaction } from "../transactions/Transaction";

type Status = NonNullable<"active" | "inactive" | "pending">;

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
  status: Status = "pending";
  f_name: string;
  l_name: string;
  name: string;
  email: string;
  mobile_number: string;
  totalDonations: string;
  lastDonation: string;
  lastDonationDate: string;
  currency: string;
  donations: {
    transactions: Transaction[] | null;
    totalDonation: number | 0;
  };

  constructor(data: any) {
    this.id = data.id;
    this.uid = data.uid;
    this.balance = data.balance;
    this.totalDonations = data.totalDonations;
    this.lastDonation = data?.lastDonation;
    this.currency = data?.currency;
    this.age = data.age;
    this.gender = data.gender;
    this.address = data.address;
    this.nationality = data.nationality;
    this.profile_image = data.profile_image;
    this.bannar_image = data.bannar_image;
    this.f_name = data.user.f_name;
    this.l_name = data.user.l_name;
    this.name = `${this.f_name} ${this.l_name}`;
    this.status = data.user.status;
    this.email = data.user.email;
    this.mobile_number = data.user.mobile_number;
    this.lastDonationDate = data?.lastDonationDate
      ? format(parseISO(data?.lastDonationDate), "EEEE dd MMMM")
      : "";
    this.donations = {
      totalDonation: data?.donations?.totalDonation || 0,
      transactions: data?.donations?.transactions
        ? data?.donations?.transactions?.map((trx: any) => new Transaction(trx))
        : null,
    };
  }

  getId(): number {
    return this.id;
  }

  getName(): string {
    return `${this.f_name} ${this.l_name}`;
  }

  getUid(): number {
    return this.uid;
  }

  getStatus(): Status {
    return this.status;
  }

  getBalance(): string {
    return this.balance;
  }

  getAge(): number {
    return this.age;
  }

  getGender(): string {
    return this.gender;
  }

  getAddress(): string {
    return this.address;
  }

  getNationality(): string {
    return this.nationality;
  }

  getProfileImage(): any {
    return this.profile_image;
  }

  getBannarImage(): any {
    return this.bannar_image;
  }

  getFirstName(): string {
    return this.f_name;
  }

  getLastName(): string {
    return this.l_name;
  }

  getEmail(): string {
    return this.email;
  }

  getMobile(): string {
    return this.mobile_number;
  }

  getTotalDonations(): string {
    return this.totalDonations;
  }

  getLastDonation(): string {
    return this.lastDonation;
  }

  getLastDonationDate(): string {
    return this.lastDonationDate;
  }

  getCurrency(): string {
    return this.currency;
  }

  getDonations(): Transaction[] | null {
    return this.donations.transactions;
  }

  getTotalDonation(): number {
    return this.donations.totalDonation;
  }
}
