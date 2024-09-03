"use client";

import Link from "next/link";
import { useMenu } from "@/hooks";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/styles";
import { SkeletonNav } from "@/layout/shared";

const Nav = () => {
  const pathname = usePathname();
  const { navMenu, isLoadedNav } = useMenu();

  return (
    <nav className="flex gap-6 items-center cursor-pointer">
      {isLoadedNav ? (
        <>
          {navMenu.map(menu => (
            <Link
              key={menu.id}
              href={menu.href || "#"}
              scroll={false}
              className={cn(
                "rounded-lg px-3 py-2",
                "text-main-gray hover:text-main-black transition-colors",
                {
                  "text-main-black": pathname === menu.href,
                },
              )}
            >
              {menu.label}
            </Link>
          ))}
        </>
      ) : (
        <SkeletonNav />
      )}
    </nav>
  );
};

export default Nav;
