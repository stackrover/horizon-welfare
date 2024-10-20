import { cn } from "@/lib/utils";

export function ShareIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("h-6 w-6", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.1141 4.49112C10.1902 3.69599 11.0203 3.04172 11.8571 3.51856C13.597 4.53773 15.2394 5.69825 16.8271 6.94049C18.7862 8.48751 20.3603 9.94706 21.4737 11.1124C21.9575 11.6189 21.9118 12.42 21.4496 12.9037C20.3535 14.0504 19.1732 15.1172 17.9553 16.1321C16.0168 17.7188 14.0104 19.257 11.8253 20.4902C11.0838 20.9084 10.2812 20.4301 10.138 19.689L10.1215 19.576L9.894 16.002C8.07832 16.0402 6.31999 16.6644 4.91368 17.8247L4.64911 18.0473C4.60595 18.0827 4.56327 18.1173 4.52106 18.1511L4.27354 18.3432C4.23325 18.3735 4.19344 18.4028 4.15412 18.4312L3.92411 18.5904C3.84941 18.6396 3.7767 18.6849 3.70601 18.7261L3.50004 18.8374C2.53411 19.314 2 18.8923 2 17C2 12.5959 5.24521 8.67742 9.63167 8.08307L9.891 8.05196L10.1141 4.49112ZM12.0229 5.96524L11.8314 9.43709C11.8178 9.68226 11.6283 9.88133 11.3841 9.90684L10.0227 10.0491C6.95767 10.4148 4.52633 12.8111 4.0752 15.9432C5.56496 14.8456 7.33483 14.1777 9.21039 14.0308L9.60656 14.0076L11.311 13.9716C11.5806 13.966 11.8061 14.175 11.8208 14.4442L12.0177 18.0397C13.6209 17.0186 15.1491 15.8442 16.6817 14.5901C17.6714 13.765 18.6261 12.9036 19.5391 11.9946L19.2812 11.7394L18.7253 11.2059C17.8517 10.3839 16.8006 9.46812 15.5911 8.51285C14.4254 7.60097 13.2427 6.74514 12.0229 5.96524Z"
        fill="#2E4049"
      />
    </svg>
  );
}