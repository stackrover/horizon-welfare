"use client";

import { UpdateVideoOnGallery } from "@/app/actions/admin/pages/video-gallery";
import { VideoCardProps } from "@/types/types";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";
import EditableContent from "../forms/EditableContent";
import FormWrapper from "../forms/FormWrapper";

export function VideoCard({
  id,
  videoUrl,
  title,
  editable = false,
  refresh,
}: VideoCardProps & {
  id: string | number;
  editable?: boolean;
  refresh?: VoidFunction;
}) {
  return (
    <FormWrapper
      defaultValues={{
        title: title,
        youtube_link: videoUrl,
      }}
      onSubmit={async (values) => {
        const fd = new FormData();

        Object.keys(values).forEach((key) =>
          fd.append(key, values[key as typeof values] || ""),
        );

        try {
          const res = await UpdateVideoOnGallery(fd, id);
          if (res.status !== "success") {
            throw new Error(res.message);
          }

          toast.success(res.message);
          refresh?.();
        } catch (error: any) {
          toast.error(error.message);
        }
      }}
    >
      <div className="flex flex-col gap-y-4">
        <EditableContent
          name="youtube_link"
          type="text"
          content={videoUrl}
          editable={editable}
        >
          <div className="user-none pointer-events-none">
            <ReactPlayer
              width="100%"
              height="100%"
              controls
              url={videoUrl}
              style={{ aspectRatio: "16/9" }}
            />
          </div>
        </EditableContent>
        <EditableContent
          name="title"
          type="text"
          content={title}
          editable={editable}
        >
          <h2 className="text-base font-semibold leading-5 text-base-400">
            {title}
          </h2>
        </EditableContent>
      </div>
    </FormWrapper>
  );
}
