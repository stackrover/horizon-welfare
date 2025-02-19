export class Comment {
  id: number;
  authorName: string;
  commentText: string;
  createdAt: string;

  constructor(data?: Record<string, any>) {
    this.id = data?.id;
    this.authorName = data?.author_name;
    this.commentText = data?.comment_text;
    this.createdAt = data?.created_at;
  }

  getId(): number {
    return this.id;
  }
  getAuthorName(): string {
    return this.authorName;
  }
  getCommentText(): string {
    return this.commentText;
  }
  getCreatedAt(): string {
    return this.createdAt;
  }
}
