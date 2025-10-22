//switches.ts
import { Switch } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./routes";

export const getAll = async (): Promise<Switch[]> => {
  const { data } = await axiosInstance.get<Switch[]>(ApiRoutes.SWITCHES);
  return data;
};
