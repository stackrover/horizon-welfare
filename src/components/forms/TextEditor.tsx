import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
    <ReactQuill
      value={value}
      onChange={onValueChange}
      placeholder={props?.placeholder || ""}
    />
  );
}
