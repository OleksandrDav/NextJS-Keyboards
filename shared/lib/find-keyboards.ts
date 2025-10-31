import { prisma } from "@/prisma/prisma-client";

export interface GetSearchParams {
  query?: string;
  sortBy?: string;
  onSale?: string;
  colors?: string;
  switches?: string;
  min?: string;
  max?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 200;

export const findKeyboards = async (params: GetSearchParams) => {
  const colorsIdArray = params.colors?.split(",");
  const switchesIdArray = params.switches?.split(",");
  const onSale = params.onSale === "true";

  const minPrice = Number(params.min) || DEFAULT_MIN_PRICE;
  const maxPrice = Number(params.max) || DEFAULT_MAX_PRICE;

  const layouts = await prisma.layout.findMany({
    where: {
      keyboards: {
        some: {}, // Only get layouts with keyboards
      },
    },
    include: {
      keyboards: {
        orderBy: {
          [params.sortBy || "createdAt"]: "desc",
        },
        where: {
          // Combine all conditions in one where object
          ...(switchesIdArray && {
            switches: {
              some: {
                id: { in: switchesIdArray },
              },
            },
          }),
          ...(colorsIdArray && {
            colorVariants: {
              some: {
                colorName: { in: colorsIdArray },
              },
            },
          }),
          // Add other filters
          ...(onSale && {
            discountPercentage: {
              gt: 0,
            },
          }),
          basePrice: {
            gte: minPrice,
            lte: maxPrice,
          },
        },
        include: {
          switches: true,
          colorVariants: {
            where: {
              colorName: { in: colorsIdArray },
            },
          },
        },
      },
    },
  });

  return layouts;
};
