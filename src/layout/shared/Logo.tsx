"use client";

import Link from "next/link";
import { useBasePath } from "@/hooks";

const Logo = () => {
  const { basePath, pageType } = useBasePath();

  return (
    <div className="shrink-0 flex h-14 items-center px-4 lg:h-[60px] lg:px-6 logo">
      <Link href={basePath} className="flex items-center gap-2 font-semibold">
        <span className="">LOGO</span>
        {pageType === "admin" && <span className=""> - Admin</span>}
      </Link>
    </div>
  );
};

export default Logo;
