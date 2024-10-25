import { cn } from "@/lib/utils";

export function GmailIcon({ className }: { className?: string }) {
  return (
    <svg
      width="224"
      height="224"
      viewBox="0 0 224 224"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={cn("h-[224px] w-[224px]", className)}
    >
      <rect width="224" height="224" fill="url(#pattern0_2349_6418)" />
      <defs>
        <pattern
          id="pattern0_2349_6418"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_2349_6418" transform="scale(0.00195312)" />
        </pattern>
        <image
          id="image0_2349_6418"
          width="512"
          height="512"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
}
