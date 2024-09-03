"use client";

import { CircleUser } from "lucide-react";
import { Button, Dropdown } from "@/components/ui";
import { useMenu } from "@/hooks";

const ProfileIcon = () => {
  const { accountMenu } = useMenu();

  return (
    <Dropdown list={accountMenu} align="end">
      <Button variant="muted" size="icon" className="rounded-full hover:text-main-gray">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">User</span>
      </Button>
    </Dropdown>
  );
};

export default ProfileIcon;
