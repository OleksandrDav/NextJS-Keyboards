// types/api.ts
import { Keyboard, ColorVariant, Switch, Layout } from "@prisma/client";

// Keyboard with its relations
export type KeyboardWithVariants = Keyboard & {
  colorVariants: ColorVariant[];
};

export type KeyboardWithFullDetails = Keyboard & {
  colorVariants: ColorVariant[];
  switches: Switch[];
  layout: Layout;
};

// You can add more composite types as needed
export type ColorVariantWithImages = ColorVariant & {
  additionalImages: {
    id: string;
    imageUrl: string;
    altText: string | null;
    sortOrder: number;
  }[];
};