import { fetcher } from "../fetch";

export const ProgramService = {
  getNavPrograms: async () => {
    return await fetcher({ url: "/program", baseUrl: process.env.NEXT_PUBLIC_JSON_SERVER_URL });
  },
};
