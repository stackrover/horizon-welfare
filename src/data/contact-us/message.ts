import { format } from "date-fns";

export class Message {
  createdAt: string;
  email: string;
  name: string;
  id: number;
  message: string;
  subject: string;
  constructor(data: any = {}) {
    this.id = data.id || null;
    this.email = data.email || "";
    this.subject = data.subject || "";
    this.message = data.message || "";
    this.name = (data.first_name || "") + " " + (data.last_name || "");
    this.createdAt = data?.created_at
      ? format(data.created_at, "dd/MM/yyyy, hh:mm a")
      : "";
  }
}
