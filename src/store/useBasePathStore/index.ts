import createCombinedStore from "../createStore";

interface Props {
  pageType: "admin" | "user";
  basePath: "/admin" | "";
  homePath: "/admin" | "/";
  loginPath: "/admin/login" | "/login";
  setBasePath: (pageType: "admin" | "user") => void;
}

const useBasePathStore = createCombinedStore<Props>(set => ({
  pageType: "user",
  basePath: "",
  homePath: "/",
  loginPath: "/login",
  setBasePath: (pageType: "admin" | "user") => {
    const basePath = pageType === "admin" ? "/admin" : "";
    const homePath = pageType === "admin" ? "/admin" : "/";
    const loginPath = pageType === "admin" ? "/admin/login" : "/login";
    set({ pageType, basePath, loginPath, homePath });
  },
}));

export default useBasePathStore;
