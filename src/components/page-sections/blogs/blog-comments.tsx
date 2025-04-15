"use client";

import { Comment } from "@/data/blogs/comment";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import { addBlogComment } from "../../../app/actions/admin/blogs";
import { SingleComment } from "../../custom/SingleComment";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function BlogComments({
  comments,
  auth,
  blogId,
}: {
  comments: Comment[] | null;
  auth: any;
  blogId: number;
}) {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const { slug } = useParams();

  const handleCommentSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Redirect to login if user is not authenticated
    if (!auth?.user?.id) {
      router.push("/login");
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    formData.append("blog_id", blogId.toString());
    formData.append("author_name", auth?.user?.name);

    const response = await addBlogComment(formData, slug as string);

    if (response.status === "success") {
      toast.success(response.message);
      const commentInput = document.getElementById(
        "comment_text",
      ) as HTMLInputElement;
      if (commentInput) commentInput.value = "";
    } else {
      toast.error(response.message);
    }

    setLoading(false);
  };

  return (
    <section className="mx-auto mt-[60px] max-w-[662px]">
      <div className="flex items-center gap-2">
        <Image
          src="/images/user.png"
          alt="blog image"
          width={50}
          height={50}
          className="h-10 w-10 rounded-full ring-2 ring-blue-600 ring-offset-2"
        />
        <form
          onSubmit={handleCommentSubmission}
          className="flex flex-1 items-center gap-2 rounded-full border border-[#B4B7C9] bg-[#F3F3F3] p-2"
        >
          <Input
            type="text"
            required
            name="comment_text"
            id="comment_text"
            className="border-none shadow-none focus-visible:ring-0"
            placeholder="Add a comment"
          />

          <Button
            disabled={loading}
            type="submit"
            className="rounded-full from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
          >
            {loading ? "Posting..." : "Post"}
          </Button>
        </form>
      </div>

      <div className="mt-6 space-y-4">
        {comments && comments?.length > 0 ? (
          comments.map((comment) => (
            <SingleComment
              key={comment.getId()}
              image="/images/user.png"
              name={comment.getAuthorName()}
              date={comment.getCreatedAt()}
              comment={comment.getCommentText()}
            />
          ))
        ) : (
          <p className="text-center">No comments yet</p>
        )}
      </div>
    </section>
  );
}
