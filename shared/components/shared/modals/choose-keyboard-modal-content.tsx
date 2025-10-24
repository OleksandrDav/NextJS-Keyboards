"use client";

import { KeyboardWithRelations } from "@/@types/keyboard";
import { useKeyboardDetails } from "@/shared/hooks/use-keyboard-details";
import {
  AddToCartButton,
  ColorSelector,
  ImageGallery,
  PriceDisplay,
  ProductDescription,
  ProductHeader,
  SwitchSelector,
} from "@/shared/components/shared/keyboard-page/keyboard-detail";

interface Props {
  keyboard: KeyboardWithRelations;
}

export const ChooseKeyboardModalContent: React.FC<Props> = ({ keyboard }) => {
  const {
    selectedColorVariant,
    selectedSwitch,
    currentImage,
    currentImages,
    finalPrice,
    handleColorChange,
    handleSwitchChange,
    handleImageChange,
  } = useKeyboardDetails(keyboard);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 max-h-[85vh] overflow-y-auto">
      {/* Image Gallery - without thumbnails */}
      <ImageGallery
        images={currentImages}
        currentImage={currentImage}
        onImageChange={handleImageChange}
        discountPercentage={keyboard.discountPercentage}
        keyboardName={keyboard.name}
      />

      {/* Product Info */}
      <div className="space-y-4">
        <ProductHeader name={keyboard.name} layoutName={keyboard.layout.name} />

        <PriceDisplay
          finalPrice={finalPrice}
          basePrice={Number(keyboard.basePrice)}
          discountPercentage={keyboard.discountPercentage}
        />

        <ProductDescription description={keyboard.description} />

        <ColorSelector
          variants={keyboard.colorVariants}
          selectedVariant={selectedColorVariant}
          onSelect={handleColorChange}
        />

        <SwitchSelector
          switches={keyboard.switches}
          selectedSwitch={selectedSwitch}
          onSelect={handleSwitchChange}
        />

        <AddToCartButton finalPrice={finalPrice} disabled={!selectedSwitch} />
      </div>
    </div>
  );
};
