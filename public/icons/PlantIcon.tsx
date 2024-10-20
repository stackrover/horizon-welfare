import { cn } from "@/lib/utils";

export function PlantIcon({ className }: { className?: string }) {
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
        d="M15.5999 14.0413C15.1837 14.4186 14.7448 14.9294 14.346 15.6145C13.9519 14.2664 13.4551 13.2782 12.9529 12.5547C15.2572 5.26135 4.02734 5 4.02734 5C4.02734 5 4.35516 14.1154 10.22 13.9061C10.208 13.2957 10.1083 12.6786 9.96858 12.0999C9.87722 11.7226 9.76854 11.3628 9.65629 11.0307C9.2813 9.92935 8.85795 9.14758 8.85795 9.14758C9.28548 9.69177 9.66405 10.2111 9.99843 10.6992C11.1491 12.3765 11.7772 13.681 12.0692 14.37C12.7899 15.8368 13.4372 18.2494 13.4372 22.1922C13.4372 22.6385 13.8199 23 14.2893 23C14.7598 23 15.1419 22.6385 15.1419 22.1922C15.1419 20.9143 15.0768 19.7773 14.9592 18.763C15.2309 17.5253 15.6411 16.6468 16.0657 16.0246C16.3445 15.5206 16.8586 14.6573 17.5513 13.776C18.1681 12.992 18.9288 12.1932 19.7892 11.623C19.7892 11.623 18.0248 13.4734 17.9107 15.2847C22.7843 15.5256 22.9736 8.26172 22.9736 8.26172C22.9736 8.26172 14.0546 8.55022 15.5999 14.0413Z"
        fill="#23C0EC"
      />
    </svg>
  );
}