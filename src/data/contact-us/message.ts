import { format } from "date-fns";

export class Message {
  createdAt: string;
  email: string;
  name: string;
  mobile_number: string;
  id: number;
  message: string;
  subject: string;
  constructor(data: any = {}) {
    this.id = data.id || null;
    this.email = data.email || "";
    this.subject = data.subject || "";
    this.mobile_number = data.mobile_number || "";
    this.message = data.message || "";
    this.name = (data.first_name || "") + " " + (data.last_name || "");
    this.createdAt = data?.created_at
      ? format(data.created_at, "dd/MM/yyyy, hh:mm a")
      : "";
  }
}
