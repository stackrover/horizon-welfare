import React, { ChangeEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Label } from "../ui/label";

export const HomePageCoverImage = ({
  preview,
  setFile,
}: {
  preview?: string;
  setFile: (file: File) => void;
}) => {
  const handleImageInput = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  return (
    <div className="flex flex-col space-y-4">
      <Label className="font-semibold"> Cover picture </Label>
      <div className="aspect-[2.14/1] w-[500px]">
        {preview ? (
          <Image
            src={preview}
            alt=""
            width={1728}
            height={808}
            style={{ width: "auto", height: "auto" }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-secondary/10 object-cover" />
        )}

        <div className="mt-4 flex items-center gap-6">
          <Button
            variant="ghost"
            className="relative bg-neutral-100 hover:bg-neutral-200 active:bg-foreground/30"
          >
            Change
            <Input
              type="file"
              onChange={handleImageInput}
              className="absolute inset-0 left-0 top-0 opacity-0"
            />
          </Button>

          <p className="text-sm font-medium text-foreground/70">
            <sup> * </sup>Image ration must be
            <code className="mx-2 inline-block bg-secondary/10 px-2 py-0.5 pl-2 text-sm font-bold">
              2.14/1
            </code>
          </p>
        </div>
      </div>
    </div>
  );
};
