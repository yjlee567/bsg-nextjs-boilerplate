"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks";
import { AuthService } from "@/services/auth";

/**
 * 전역 유저 정보 설정
 */
const AuthLoader = () => {
  const { isLoggedIn, updateUserInfo } = useAuth();

  const loadUserInfo = async (userId: string) => {
    try {
      const data = await AuthService.getUserInfo();
      if (data) {
        updateUserInfo(data[userId]);
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    
    // TEMP: 임시로 user 하드 코딩
    loadUserInfo("user");
  }, [isLoggedIn]);

  return null;
};

export default AuthLoader;
