import Link from "next/link";

type Menu = {
  id: number;
  title: string;
  path: string;
};

export function FooterLinks({ menus }: { menus: Menu[] }) {
  return (
    <div className="flex justify-center">
      <nav>
        <h2 className="mb-6 text-[26px] font-semibold leading-8 text-base-400">
          Main Menu
        </h2>
        <ul className="flex flex-col gap-y-4">
          {menus.map((menu) => (
            <li key={menu.id}>
              <Link
                className="text-2xl font-medium leading-[30px] text-base-300 transition-all duration-300 ease-in-out hover:text-base-400"
                href={menu.path}
              >
                {menu.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
