"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useGlobalSetting, useMenu } from "@/hooks";
import { SkeletonNav } from "@/layout/shared";
import TreeView from "@/components/ui/TreeView";

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { navMenu, isLoadedNav } = useMenu();
  const { expandedNavItems, setExpandedNavItems } = useGlobalSetting();
  const [selectedItems, setSelectedItems] = useState<string[]>([pathname]);

  const handleChangeExpand = (id: string) => {
    const newItems = expandedNavItems.includes(id)
      ? expandedNavItems.filter(item => item !== id)
      : [...expandedNavItems, id];
    setExpandedNavItems(newItems);
  };

  const handleChangeSelect = (id: string) => {
    setSelectedItems([id]);
    router.push(id);
  };

  return (
    <div className="grow">
      <nav className="grid text-sm items-start px-2 lg:px-4 nav">
        {isLoadedNav ? (
          <TreeView
            list={navMenu}
            expandedItems={expandedNavItems}
            selectedItems={selectedItems}
            onChangeExpand={handleChangeExpand}
            onChangeSelect={handleChangeSelect}
            useLink
            theme="navy"
          />
        ) : (
          <SkeletonNav direction="flex-col" />
        )}
      </nav>
    </div>
  );
};

export default Nav;
