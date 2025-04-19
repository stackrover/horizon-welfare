import { format } from "date-fns";

export class BlogComment {
  author_name: string;
  blog_id: number;
  comment_text: string;
  created_at: string;
  id: number;
  status: string;
  updated_at: string;
  constructor(data: any = {}) {
    this.author_name = data.author_name || "";
    this.blog_id = data.blog_id || 0;
    this.comment_text = data.comment_text || "";
    this.id = data.id || 0;
    this.status = data.status || "";
    this.created_at = data?.created_at
      ? format(data?.created_at, "dd/MM/yyyy, hh:mm a")
      : "";
    this.updated_at = data?.updated_at
      ? format(data?.updated_at, "dd/MM/yyyy, hh:mm a")
      : "";
  }
}
