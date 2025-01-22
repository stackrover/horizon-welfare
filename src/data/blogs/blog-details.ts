import { format, parseISO } from "date-fns";

export class BlogDetail {
  id: number;
  title: string;
  category_id: number;
  category_title: string;
  thumbnail: string;
  description: string;
  author_name: string;
  status: string;
  comments: Array<{
    id: number;
    author_name: string;
    comment_text: string;
    created_at: string;
  }>;
  created_at: string;

  constructor(data: any) {
    this.id = data?.id || null;
    this.title = data?.title || "";
    this.category_id = data?.category_id || null;
    this.category_title = data?.category_title || "";
    this.thumbnail = data?.thumbnail || "";
    this.description = data?.description || "";
    this.author_name = data?.author_name || "";
    this.status = data?.status || "";
    this.comments =
      data?.comments?.length > 0
        ? data.comments.map((d: any) => {
            return {
              id: d.id,
              author_name: d.author_name,
              comment_text: d.comment_text,
              created_at: d.created_at
                ? format(parseISO(d.created_at), "MMMM dd, yyyy")
                : "",
            };
          })
        : [];
    this.created_at = data?.created_at
      ? format(parseISO(data?.created_at), "MMMM dd, yyyy")
      : "";
  }
}
