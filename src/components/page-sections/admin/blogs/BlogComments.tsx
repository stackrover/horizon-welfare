"use client";

import { Loader } from "@/components";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogComment } from "@/data/blogs/blog-comment";
import { useSWR } from "@/hooks/use-swr";
import {
  IconLoader2,
  IconMessage,
  IconTrash,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import toast from "react-hot-toast";
import {
  deleteBlogComment,
  updateBlogComment,
} from "../../../../app/actions/admin/blogs";

export default function BlogCommentList({
  blogId,
  className,
  showIcon = true,
}: {
  blogId: number;
  className?: string;
  showIcon?: boolean;
}) {
  const [loading, setLoading] = React.useState(false);
  const [selectedId, setSelectedId] = React.useState<number | null>(null);
  const { data, isLoading, refresh } = useSWR(`/blog/comment/list/${blogId}`);

  if (isLoading) {
    return <Loader />;
  }

  const blogData =
    data?.data?.results?.length > 0
      ? data?.data?.results.map((d: any) => new BlogComment(d))
      : [];

  const handleCommentStatusChange = async (
    comment: BlogComment,
    status: string,
  ) => {
    const fd = new FormData();

    fd.append("blog_id", comment.blog_id.toString());
    fd.append("author_name", comment.author_name);
    fd.append("comment_text", comment.comment_text);
    fd.append("status", status);

    const response = await updateBlogComment(fd, comment.id);

    if (response.status === "success") {
      toast.success(response.message);
      refresh();
    } else {
      toast.error(response.message);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this comment?",
    );
    if (!confirm) return;

    setLoading(true);
    setSelectedId(commentId);

    const response = await deleteBlogComment(commentId);

    if (response.status === "success") {
      toast.success(response.message);
      refresh();
    } else {
      toast.error(response.message);
    }

    setLoading(false);
    setSelectedId(null);
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        {showIcon ? (
          <Button variant="ghost" size="icon">
            <IconMessage />
          </Button>
        ) : null}
      </DrawerTrigger>

      <DrawerContent className="inset-x-auto inset-y-0 right-0 m-3 w-full max-w-[450px] rounded-xl bg-background after:!bg-transparent">
        <DrawerHeader className="relative">
          <DrawerTitle> Comments </DrawerTitle>
          <DrawerDescription className="hidden" />

          <DrawerClose asChild className="absolute right-2 top-2">
            <Button variant="ghost" size="icon">
              <IconX size={18} className="opacity-70" />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ScrollArea className="w-full p-4">
          {blogData.length > 0 ? (
            blogData.map((comment: BlogComment) => (
              <div
                key={comment.id}
                className="mb-2 flex w-full items-center gap-2 rounded-md border p-2"
              >
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full items-center justify-between gap-2">
                    <div>
                      <h5 className="text-base font-semibold text-base-400">
                        {comment.author_name}
                      </h5>
                      <p className="text-xs font-normal text-base-300">
                        {comment.created_at}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Select
                        value={comment.status}
                        onValueChange={(value) =>
                          handleCommentStatusChange(comment, value)
                        }
                      >
                        <SelectTrigger className="h-8 w-fit">
                          <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent align="end">
                          <SelectGroup>
                            <SelectItem value="active">Posted</SelectItem>
                            <SelectItem value="pending">Hidden</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      <Button
                        disabled={loading}
                        onClick={() => handleDeleteComment(comment.id)}
                        type="button"
                        size="sm"
                        className="h-8 w-8 p-0"
                        variant="destructive"
                      >
                        {loading && selectedId === comment.id ? (
                          <IconLoader2 size={16} className="animate-spin" />
                        ) : (
                          <IconTrash size={16} />
                        )}
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm font-normal text-base-300">
                    {comment.comment_text}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center gap-2 p-2">
              <h5 className="text-sm font-semibold text-base-400">
                No comments yet
              </h5>
            </div>
          )}
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
