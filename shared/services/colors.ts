//switches.ts
import { ColorVariant } from "@prisma/client";
import { axiosInstance } from "./instance";
import { ApiRoutes } from "./routes";

type Color = Pick<ColorVariant, 'id' | 'colorName' | 'colorHex'>;

export const getAll = async (): Promise<Color[]> => {
  const { data } = await axiosInstance.get<Color[]>(ApiRoutes.COLORS);
  return data;
};
