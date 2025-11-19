"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";

interface ColorVariant {
  id: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
}

interface Props {
  colorVariants: ColorVariant[];
  defaultImageUrl: string;
  discountPercentage: number;
}

export const ColorSelector: React.FC<Props> = ({ 
  colorVariants, 
  defaultImageUrl,
  discountPercentage
}) => {
  const [currentImage, setCurrentImage] = React.useState(defaultImageUrl);

  // Reset when defaultImageUrl changes (e.g., when filters change)
  React.useEffect(() => {
    setCurrentImage(defaultImageUrl);
  }, [defaultImageUrl]);

  const handleColorHover = (imageUrl: string) => {
    setCurrentImage(imageUrl);
  };

  return (
    <>
      {/* Image container with relative positioning */}
      <div className="relative flex justify-center items-center h-[260px]">
        <Image
          className="w-full h-auto max-w-[260px] max-h-[260px] object-contain transition-opacity duration-300"
          src={currentImage}
          alt="Product"
          width={260}
          height={260}
          priority
        />
        {/* Discount badge - positioned absolutely */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Color selector dots - only show if multiple colors */}
      {colorVariants && colorVariants.length > 1 && (
        <div className="flex gap-2 mt-2">
          {colorVariants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onMouseEnter={() => handleColorHover(variant.imageUrl)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all cursor-pointer",
                currentImage === variant.imageUrl
                  ? "border-gray-800 scale-110"
                  : "border-gray-300 hover:border-gray-500"
              )}
              style={{ backgroundColor: variant.colorHex }}
              title={variant.colorName}
              aria-label={`Select ${variant.colorName} color`}
            />
          ))}
        </div>
      )}
    </>
  );
};