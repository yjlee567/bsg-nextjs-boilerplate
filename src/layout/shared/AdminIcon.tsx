"use client";

import Link from "next/link";
import { UserRoundCog } from "lucide-react";

const AdminIcon = () => {
  return (
    <Link href="/admin" className="p-2.5 rounded-full bg-muted hover:text-main-gray">
      <UserRoundCog className="w-5 h-5" />
    </Link>
  );
};

export default AdminIcon;
