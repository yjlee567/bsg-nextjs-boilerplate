"use client";

import { useRouter } from "next/navigation";
import { useBasePathStore } from "@/store";

const useBasePath = () => {
  const router = useRouter();

  const pageType = useBasePathStore(state => state.pageType);
  const basePath = useBasePathStore(state => state.basePath);
  const loginPath = useBasePathStore(state => state.loginPath);
  const homePath = useBasePathStore(state => state.homePath);
  const setBasePath = useBasePathStore(state => state.setBasePath);

  const goHomePage = () => {
    router.push(homePath);
  };

  const goLoginPage = () => {
    router.push(loginPath);
  };

  const updateBasePath = (pageType: "admin" | "user") => {
    setBasePath(pageType);
  };

  return { pageType, basePath, loginPath, goHomePage, goLoginPage, updateBasePath };
};

export default useBasePath;
