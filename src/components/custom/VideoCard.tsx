"use client";

import { VideoCardProps } from "@/types/types";
import ReactPlayer from "react-player";
import FormWrapper from "../forms/FormWrapper";
import EditableContent from "../forms/EditableContent";

export function VideoCard({
  videoUrl,
  title,
  editable = false,
}: VideoCardProps & { editable?: boolean }) {
  return (
    <FormWrapper
      defaultValues={{
        title: title,
        youtube_link: videoUrl,
      }}
      onSubmit={(values) => {
        // TODO: Need to implement this function
        console.log({ values });
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
