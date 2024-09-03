"use client";

import { House } from "lucide-react";
import Link from "next/link";

const PortalIcon = () => {
  return (
    <Link href="/" className="p-2.5 rounded-full bg-muted hover:text-main-gray">
      <House className="w-5 h-5" />
    </Link>
  );
};

export default PortalIcon;
