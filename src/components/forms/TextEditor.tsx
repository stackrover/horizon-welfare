"use client";

import { addBlogImage, deleteBlogImage } from "@/app/actions/admin/blogs";
import * as React from "react";
import toast from "react-hot-toast";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getImageURL } from "../../lib/utils";

type TextEditorProps = {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  placeholder?: string;
};

export default function TextEditor({
  className,
  value,
  onValueChange,
  ...props
}: TextEditorProps) {
  const quillRef = React.useRef<ReactQuill>(null);
  const prevImagesRef = React.useRef<string[]>([]);

  // Helper to extract image URLs from editor HTML
  const extractImageURLs = (html: string): string[] => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const images = doc.querySelectorAll("img");
    return Array.from(images).map((img) => img.src);
  };

  // Compare and delete removed images
  const handleEditorChange = (content: string) => {
    onValueChange(content);

    const currentImages = extractImageURLs(content);
    const removedImages = prevImagesRef.current.filter(
      (url) => !currentImages.includes(url),
    );

    console.log({ removedImages });

    removedImages.forEach(async (url) => {
      const res = await deleteBlogImage(url);
      console.log(res);
      if (res.status === "success") {
        prevImagesRef.current = currentImages;
      }
    });
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      console.log({ file });
      if (file) {
        const formData = new FormData();
        formData.append("image", file);

        const res = await addBlogImage(formData);

        console.log(res);

        if (res.status === "success") {
          const url = getImageURL(res.results.image);

          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection();
          if (range && url) {
            editor?.insertEmbed(range.index, "image", url);
          }
        } else {
          toast.error("Image not uploaded!");
        }
      }
    };
  };

  const modules = React.useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    [],
  );

  React.useEffect(() => {
    prevImagesRef.current = extractImageURLs(value);
  }, []);

  if (!document || !window) return null;

  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ReactQuill
        ref={quillRef}
        value={value}
        onChange={handleEditorChange}
        modules={modules}
        placeholder={props?.placeholder || ""}
        className={className}
      />
    </React.Suspense>
  );
}
