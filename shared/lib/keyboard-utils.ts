import { ColorVariantWithImages, SwitchType, KeyboardImage } from '@/@types/keyboard';

// Calculate the final price including discount and switch modifier

export function calculateFinalPrice(
  basePrice: number,
  discountPercentage: number,
  switchModifier: number = 0
): number {
  const discountedPrice = basePrice * (1 - discountPercentage / 100);
  return discountedPrice + switchModifier;
}

// Get all images for a color variant (main image + additional images)

export function getImagesForVariant(
  variant: ColorVariantWithImages,
  keyboardName: string
): KeyboardImage[] {
  return [
    {
      id: 'main',
      imageUrl: variant.imageUrl,
      altText: keyboardName,
    },
    ...(variant.additionalImages || []).map(img => ({
      id: img.id,
      imageUrl: img.imageUrl,
      altText: img.altText,
    })),
  ];
}

// Find the default color variant or return the first one

export function getDefaultVariant(
  variants: ColorVariantWithImages[]
): ColorVariantWithImages {
  return variants.find((variant) => variant.isDefault) || variants[0];
}

// Get the price modifier for a switch (0 if no switch selected)

export function getSwitchModifier(selectedSwitch: SwitchType | null): number {
  return selectedSwitch ? Number(selectedSwitch.priceModifier) : 0;
}