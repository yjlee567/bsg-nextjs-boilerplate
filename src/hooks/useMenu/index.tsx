"use client";

import { useMenuStore } from "@/store";

const useMenu = () => {
  const accountMenu = useMenuStore(state => state.accountMenu);
  const navMenu = useMenuStore(state => state.navMenu);
  const isLoadedNav = useMenuStore(state => state.isLoadedNav);

  return {
    accountMenu,
    navMenu,
    isLoadedNav
  };
};

export default useMenu;
