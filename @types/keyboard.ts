// TESTING GENERATED PRISMA HELPERS :) 
// LOOKS GOOD TO ME :)

import { Prisma } from '@prisma/client';

// Color variant with its additional images
export type ColorVariantWithImages = Prisma.ColorVariantGetPayload<{
  include: {
    additionalImages: true;
  };
}>;

// Switch type
export type SwitchType = Prisma.SwitchGetPayload<true>;

// Keyboard with all relations
export type KeyboardWithRelations = Prisma.KeyboardGetPayload<{
  include: {
    layout: true;
    switches: true;
    colorVariants: {
      include: {
        additionalImages: true;
      };
    };
  };
}>;

export type KeyboardDetails = Prisma.KeyboardGetPayload<{
  include: {
    switches: true;
    colorVariants: true
  };
}>;

// Image structure used in the UI
export type KeyboardImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
};