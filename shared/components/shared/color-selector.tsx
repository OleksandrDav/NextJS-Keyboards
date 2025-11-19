"use client";

import React from "react";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

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
  id: string;
}

export const ColorSelector: React.FC<Props> = ({ colorVariants, defaultImageUrl, discountPercentage, id }) => {
  const [currentImage, setCurrentImage] = React.useState(defaultImageUrl);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  // Detect touch device
  React.useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };

    checkTouchDevice();
    window.addEventListener("resize", checkTouchDevice);
    return () => window.removeEventListener("resize", checkTouchDevice);
  }, []);

  // Reset when defaultImageUrl changes
  React.useEffect(() => {
    setCurrentImage(defaultImageUrl);
  }, [defaultImageUrl]);

  const handleColorHover = (imageUrl: string) => {
    if (!isTouchDevice) {
      setCurrentImage(imageUrl);
    }
  };

  const handleColorClick = (imageUrl: string) => {
    if (isTouchDevice) {
      setCurrentImage(imageUrl);
    }
  };

  return (
    <>
      {/* Image container with relative positioning */}

      <div className="relative flex justify-center items-center h-[260px]">
        <Link href={`/keyboard/${id}`}>
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
        </Link>
      </div>

      {/* Color selector dots - only show if multiple colors */}
      {colorVariants && colorVariants.length > 1 && (
        <div className="flex gap-2 mt-2">
          {colorVariants.map((variant) => (
            <button
              key={variant.id}
              type="button"
              onMouseEnter={() => handleColorHover(variant.imageUrl)}
              onClick={() => handleColorClick(variant.imageUrl)}
              className={cn(
                "w-6 h-6 rounded-full border-2 transition-all cursor-pointer",
                "color-selector-hover", // Add this class
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
