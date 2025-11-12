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
} from "./keyboard-detail";
import { useCartStore } from "@/shared/store/cart";
import { toast } from "sonner";

interface KeyboardDetailContentProps {
  keyboard: KeyboardWithRelations;
  showThumbnails?: boolean;
  className?: string;
  onAddToCartSuccess?: () => void;
}

export const KeyboardDetailContent: React.FC<KeyboardDetailContentProps> = ({
  keyboard,
  showThumbnails = true,
  className = "grid grid-cols-1 lg:grid-cols-2 gap-12",
  onAddToCartSuccess,
}) => {
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

  const addCartItem = useCartStore((state) => state.addCartItem);
  const loading = useCartStore((state) => state.loading);

  const onAddKeyboard = async () => {
    if (!selectedSwitch) {
      toast.error("Please select a switch type", { style: { fontSize: "14px" } });
      return;
    }

    try {
      await addCartItem({
        keyboardId: keyboard.id,
        switchId: selectedSwitch.id,
        colorVariantId: selectedColorVariant.id,
      });
      toast.success("Added to cart successfully!", { style: { fontSize: "14px" } });

      onAddToCartSuccess?.();
    } catch (error) {
      console.error("Failed to add to cart:", error);
      toast.error("Failed to add to cart. Please try again.", { style: { fontSize: "14px" } });
    }
  };

  return (
    <div className={className}>
      {/* Image Gallery */}
      <ImageGallery
        images={currentImages}
        currentImage={currentImage}
        onImageChange={handleImageChange}
        discountPercentage={keyboard.discountPercentage}
        keyboardName={keyboard.name}
        showThumbnails={showThumbnails}
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

        <SwitchSelector switches={keyboard.switches} selectedSwitch={selectedSwitch} onSelect={handleSwitchChange} />

        <AddToCartButton
          onSubmit={onAddKeyboard}
          finalPrice={finalPrice}
          disabled={!selectedSwitch || loading}
          loading={loading}
        />
      </div>
    </div>
  );
};
