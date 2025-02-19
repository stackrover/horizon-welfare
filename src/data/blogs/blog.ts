import { format, parseISO } from "date-fns";
import { Comment } from "./comment";

export class Blog {
  id: number;
  category_id: number;
  category_title: string;
  title: string;
  thumbnail: string;
  author_name: string;
  status: string;
  created_at: string;
  slug: string;
  description: string;
  comments: Comment[] | null;

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

    this.description = data?.description || "";
    this.slug = data?.slug || "";
    this.comments = data?.comments
      ? data?.comments?.map(
          (comment: Record<string, any>) => new Comment(comment),
        )
      : null;
  }

  getId(): number {
    return this.id;
  }

  getCategoryId(): number {
    return this.category_id;
  }

  getCategoryTitle(): string {
    return this.category_title;
  }

  getTitle(): string {
    return this.title;
  }

  getThumbnail(): string {
    return this.thumbnail;
  }

  getAuthorName(): string {
    return this.author_name;
  }
  getStatus(): string {
    return this.status;
  }
  getCreationDate(): string {
    return this.created_at;
  }

  getContent(): string {
    return this.description;
  }

  getSlug(): string {
    return this.slug;
  }

  getComment(): Comment[] | null {
    return this.comments;
  }
}
