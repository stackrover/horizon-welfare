import { format, parseISO } from "date-fns";

export class Blog {
  id: number;
  category_id: number;
  category_title: string;
  title: string;
  thumbnail: string;
  author_name: string;
  status: string;
  created_at: string;

  constructor(data: any) {
    this.id = data?.id || null;
    this.category_id = data?.category_id || null;
    this.category_title = data?.category_title || "";
    this.title = data?.title || "";
    this.thumbnail = data?.thumbnail || "";
    this.author_name = data?.author_name || "";
    this.status = data?.status || "";
    this.created_at = data?.created_at
      ? format(parseISO(data?.created_at), "MMMM dd, yyyy")
      : "";
  }
}
