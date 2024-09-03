"use client";

import { useAuthStore } from "@/store";
import { User } from "@/types/user";
import { useBasePath, useAlert } from "@/hooks";

const useAuth = () => {
  const { pageType, goLoginPage, goHomePage } = useBasePath();
  const { addAlert } = useAlert();

  const userInfo = useAuthStore(state => state.userInfo);
  const isLoggedIn = useAuthStore(state => state.isLoggedIn);
  const setAuthStore = useAuthStore(state => state.setAuthStore);

  const updateUserInfo = (userInfo: User) => {
    setAuthStore({ userInfo, isLoggedIn: true });
  };

  const updateIsLoggedIn = (value: boolean) => {
    setAuthStore({ isLoggedIn: value });
  };

  const clearUserInfo = () => {
    setAuthStore({ userInfo: null, isLoggedIn: false });
  };

  const fetchLogin = async (credentials: { id: string; password: string }) => {
    addAlert({
      message: "Login success!",
      status: "success",
      duration: 2000,
    });
    updateIsLoggedIn(true);
    goHomePage();

    // try {
    //   const { data } = await AuthService.login(credentials, pageType);

    //   if (data) {
    //     addAlert({
    //       message: "Login success!",
    //       status: "success",
    //       duration: 2000,
    //     });
    //     updateIsLoggedIn(true);
    //     goHomePage();
    //   } else {
    //     addAlert({
    //       message: "Please check your id or password",
    //       status: "error",
    //     });
    //   }
    // } catch (e) {
    //   console.error(e);
    //   addAlert({
    //     message: "Invalid id or password",
    //     status: "error",
    //   });
    // }
  };

  const fetchLogout = async () => {
    clearUserInfo();
    goLoginPage();

    // try {
    //   const { status } = await AuthService.logout(pageType);
    //   if (status === 200) {
    //     clearUserInfo();
    //     goLoginPage();
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return { userInfo, isLoggedIn, updateIsLoggedIn, updateUserInfo, fetchLogin, fetchLogout };
};

export default useAuth;
