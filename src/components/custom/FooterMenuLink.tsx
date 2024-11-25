import Link from "next/link";

export function FooterMenuLink({ href, text }: { href: string; text: string }) {
  return (
    <li>
      <Link
        className="text-2xl font-medium leading-[30px] text-base-300 transition-all duration-300 ease-in-out hover:text-base-400"
        href={`/${href}`}
      >
        {text}
      </Link>
    </li>
  );
}
