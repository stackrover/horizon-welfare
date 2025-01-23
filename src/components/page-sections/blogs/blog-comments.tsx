"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Comment } from "../../../data";
import { SingleComment } from "../../custom/SingleComment";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";

export function BlogComments({
  comments,
  auth,
}: {
  comments: Comment[];
  auth: any;
}) {
  const router = useRouter();

  const handleCommentSubmission = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    // Redirect to login if user is not authenticated
    if (!auth?.user?.id) {
      router.push("/login");
      return;
    }

    // Extract form elements
    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment") as string;
    const honeyPot = formData.get("honeyPot") as string;

    // Ignore submission if honeypot field is filled (spam prevention)
    if (honeyPot) return;

    console.log(comment, honeyPot);
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
            name="comment"
            className="border-none shadow-none focus-visible:ring-0"
            placeholder="Add a comment"
          />
          <Input
            type="text"
            name="honeyPot"
            className="hidden"
            placeholder="Add a comment"
          />
          <Button
            type="submit"
            className="rounded-full from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700"
          >
            Post
          </Button>
        </form>
      </div>

      <div className="mt-6 space-y-4">
        {comments.length > 0
          ? comments.map((comment) => (
              <SingleComment
                key={comment.id}
                image="/images/user.png"
                name={comment.author_name}
                date={comment.created_at}
                comment={comment.comment_text}
              />
            ))
          : "No comments yet"}
      </div>
    </section>
  );
}
