//keyboards.ts
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./routes";
import { KeyboardWithVariants } from "@/@types/api";

export const search = async (query: string): Promise<KeyboardWithVariants[]> => {
  const { data } = await axiosInstance.get<KeyboardWithVariants[]>(
    ApiRoutes.SEARCH_KEYBOARDS,
    {
      params: { query },
    }
  );
  return data;
};