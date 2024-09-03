import { Role } from "@/types/user";
import { fetcher } from "../fetch";

export const AuthService = {
  login: async (credentials: { id: string; password: string }, pageType: Role) => {
    return await fetcher({
      url: `/api/${pageType}/login`,
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
  logout: async (pageType: Role) => {
    return await fetcher({
      url: `/api/${pageType}/logout`,
    });
  },
  getUserInfo: async () => {
    return await fetcher({
      url: "/userInfo",
      baseUrl: process.env.NEXT_PUBLIC_JSON_SERVER_URL,
    });
  },
};
