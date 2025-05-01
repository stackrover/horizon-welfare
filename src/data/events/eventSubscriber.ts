import { format } from "date-fns";

export class EventSubscriberData {
  createdAt: string;
  email: string;
  fname: string;
  lname: string;
  name: string;
  profession: string;
  mobile_number: string;
  id: number;
  message: string;
  eventName: string;
  constructor(data: any = {}) {
    this.id = data.id || null;
    this.fname = data.lname || "";
    this.lname = data.fname || "";
    this.email = data.email || "";
    this.profession = data.profession || "";
    this.mobile_number = data.mobile || "";
    this.message = data.message || "";
    this.name = (this.fname || "") + " " + (this.lname || "");
    this.createdAt = data?.created_at
      ? format(data.created_at, "dd/MM/yyyy, hh:mm a")
      : "";
    this.eventName = data?.event ? data?.event?.title : "";
  }
}
