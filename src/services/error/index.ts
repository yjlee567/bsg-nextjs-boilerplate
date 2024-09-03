import { fetcher } from "../fetch";

export const ErrorService = {
  badRequest: async () => {
    return await fetcher({ url: "/api/error/400" });
  },
  unauthorized: async () => {
    return await fetcher({ url: "/api/error/401" });
  },
  forbidden: async () => {
    return await fetcher({ url: "/api/error/403" });
  },
  notFound: async () => {
    return await fetcher({ url: "/api/error/404" });
  },
  server: async () => {
    return await fetcher({ url: "/api/error/500" });
  },
};
