"use client";

import dynamic from "next/dynamic";
import * as React from "react";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

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
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <ReactQuill
        value={value}
        onChange={onValueChange}
        placeholder={props?.placeholder || ""}
      />
    </React.Suspense>
  );
}
