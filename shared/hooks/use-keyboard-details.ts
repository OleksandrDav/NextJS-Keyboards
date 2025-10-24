import { useState, useMemo } from 'react';
import {
  KeyboardWithRelations,
  ColorVariantWithImages,
  SwitchType,
} from '@/@types/keyboard';
import {
  calculateFinalPrice,
  getImagesForVariant,
  getDefaultVariant,
  getSwitchModifier,
} from '@/shared/lib/keyboard-utils';

export function useKeyboardDetails(keyboard: KeyboardWithRelations) {
  // Initialize with default color variant
  const defaultVariant = useMemo(
    () => getDefaultVariant(keyboard.colorVariants),
    [keyboard.colorVariants]
  );

  const [selectedColorVariant, setSelectedColorVariant] = 
    useState<ColorVariantWithImages>(defaultVariant);
  const [selectedSwitch, setSelectedSwitch] = useState<SwitchType | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  // Calculate final price including switch modifier
  const finalPrice = useMemo(() => {
    const basePrice = Number(keyboard.basePrice);
    const switchModifier = getSwitchModifier(selectedSwitch);
    return calculateFinalPrice(
      basePrice,
      keyboard.discountPercentage,
      switchModifier
    );
  }, [keyboard.basePrice, keyboard.discountPercentage, selectedSwitch]);

  // Get all images for the selected color variant
  const currentImages = useMemo(
    () => getImagesForVariant(selectedColorVariant, keyboard.name),
    [selectedColorVariant, keyboard.name]
  );

  // Get the currently displayed image
  const currentImage = currentImages[selectedImageIndex] || currentImages[0];

  // Handle color variant change
  const handleColorChange = (variant: ColorVariantWithImages) => {
    setSelectedColorVariant(variant);
    setSelectedImageIndex(0); // Reset to first image when color changes
  };

  // Handle switch selection
  const handleSwitchChange = (switchItem: SwitchType) => {
    setSelectedSwitch(switchItem);
  };

  // Handle image selection
  const handleImageChange = (index: number) => {
    setSelectedImageIndex(index);
  };

  return {
    selectedColorVariant,
    selectedSwitch,
    selectedImageIndex,
    currentImage,
    currentImages,
    finalPrice,
    handleColorChange,
    handleSwitchChange,
    handleImageChange,
  };
}