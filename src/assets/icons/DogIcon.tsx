import { cn } from "@/lib/utils";

export function DogIcon({ className }: { className?: string }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-[28px] w-[28px]", className)}
    >
      <rect width="28" height="28" rx="4" fill="#FFFDFD" />
      <path
        d="M22.8737 17.8049V18.7838C22.8737 19.4316 22.4432 19.9857 21.8399 20.2019C21.8402 20.2266 21.8408 20.2511 21.8408 20.2757V22.945C23.0952 22.6977 24.0408 21.6396 24.0408 20.3757V17.8048L22.8737 17.8049Z"
        fill="#23C0EC"
      />
      <path
        d="M14.7675 10.4483V9.42479C14.7675 8.53881 14.4219 7.68007 13.794 7.00645C13.2062 6.37588 12.4331 5.97522 11.5976 5.86403C11.4127 5.694 11.075 5.38379 10.7364 5.07415C10.4436 4.80627 10.2096 4.59289 10.0403 4.43996C9.94329 4.35226 9.86196 4.2792 9.80428 4.22832C9.67809 4.11699 9.44341 3.90956 9.09566 4.04364L8.7235 4.18744L8.77233 6.38559L8.68062 6.44851C8.08217 6.85932 7.68132 7.49163 7.57833 8.18569L5.98195 9.19735L5.97661 9.89243C5.9728 10.4225 6.18703 10.9215 6.5801 11.2977C6.97332 11.6738 7.497 11.881 8.05501 11.881H9.27068V12.9002C9.27068 13.4065 9.35628 13.9068 9.52474 14.3872L10.4259 16.9554V20.8565C9.48049 21.0676 8.77309 21.8751 8.77095 22.8364L8.76897 22.9983L12.2484 22.9987C12.3436 22.133 13.0121 21.4262 13.8855 21.2289V20.5486C13.8855 18.6874 15.4793 17.1733 17.4384 17.1733H17.5243V18.282H17.4384C16.1229 18.282 15.0527 19.2988 15.0527 20.5486V22.2826H14.3812C13.9194 22.2826 13.5311 22.5889 13.4295 22.9989L20.7081 23V20.2758C20.7081 17.8557 19.7532 15.5464 18.0193 13.7734L14.7675 10.4483Z"
        fill="#23C0EC"
      />
    </svg>
  );
}
