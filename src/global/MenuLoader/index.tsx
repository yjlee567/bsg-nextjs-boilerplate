"use client";

import { useEffect, useMemo } from "react";
import { useMenuStore } from "@/store";
import { useAuth, useBasePath, useApiError } from "@/hooks";
import { OriginProgram } from "@/types/layout";
import { Book, Bot, Home, LineChart, Package } from "lucide-react";
import { DropdownItemType } from "@/types/ui";
import { usePathname } from "next/navigation";
import { ProgramService } from "@/services/program";

const MenuLoader = () => {
  const isAdminPage = usePathname()?.startsWith("/admin");
  const { updateBasePath } = useBasePath();
  const { fetchLogout: handleLogout } = useAuth();
  const { onHandleError } = useApiError();

  const pageType = useMemo(() => (isAdminPage ? "admin" : "user"), [isAdminPage]);

  const setMenu = useMenuStore(state => state.setMenu);
  const setLoaded = useMenuStore(state => state.setLoaded);

  const loadNavMenu = async (pageType: "admin" | "user") => {
    try {
      const data = await ProgramService.getNavPrograms();
      const newData = updateNavMenu(data[pageType]);
      setMenu({ navMenu: newData });
      setLoaded({ isLoadedNav: true });
    } catch (e) {
      onHandleError(e as any, { message: "경로 가져오기 실패" });
    }
  };

  useEffect(() => {
    updateBasePath(pageType);
    loadNavMenu(pageType);
  }, [pageType]);

  useEffect(() => {
    const accountMenu = getTotalMenu({ handleLogout, pageType });
    setMenu({ accountMenu });
  }, [pageType, handleLogout]);

  return null;
};

function updateNavMenu(data: any) {
  return data.map((item: OriginProgram) => updateItem(item));
}

function updateItem(program: OriginProgram) {
  return {
    ...program,
    id: program.id,
    label: program.programName,
    href: program.href,
    path: program.path || "/components/pages/shared/NotFoundPage",
    icon: getTargetIcon(program.icon),
  };
}

function getTargetIcon(icon?: string) {
  switch (icon) {
    case "Home":
      return <Home className="h-4 w-4" />;
    case "sample1":
      return <Book className="h-4 w-4" />;
    case "components":
      return <Package className="h-4 w-4" />;
    case "charts":
      return <LineChart className="h-4 w-4" />;
    default:
      return <Bot className="h-4 w-4" />;
  }
}

function getLogoutMenu(handleLogout: () => void) {
  return {
    type: "dropdownItem",
    label: "Logout",
    value: "logout",
    onClick: handleLogout,
  } as DropdownItemType;
}

function getTotalMenu({
  handleLogout,
  pageType,
}: {
  handleLogout: () => void;
  pageType: "admin" | "user";
}) {
  return [getLogoutMenu(handleLogout)];
}

export default MenuLoader;
