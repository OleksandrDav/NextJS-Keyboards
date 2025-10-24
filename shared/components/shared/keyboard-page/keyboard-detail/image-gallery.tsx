import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { KeyboardImage } from "@/@types/keyboard";
import React from "react";

interface Props {
  images: KeyboardImage[];
  currentImage: KeyboardImage;
  onImageChange: (index: number) => void;
  discountPercentage: number;
  keyboardName: string;
  showThumbnails?: boolean; // Add this prop
}

export const ImageGallery: React.FC<Props> = ({
  images,
  currentImage,
  onImageChange,
  discountPercentage,
  keyboardName,
  showThumbnails = true, // Default to true for backward compatibility
}) => {
  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative bg-gray-100 rounded-2xl overflow-hidden">
        <Image
          src={currentImage.imageUrl}
          alt={currentImage.altText || keyboardName}
          fill
          className="object-cover"
          priority
        />
        {discountPercentage > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Thumbnail Additional Images - conditionally rendered */}
      {showThumbnails && images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => onImageChange(index)}
              className={cn(
                "aspect-square relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer transition-all",
                "hover:ring-2 hover:ring-gray-400",
                currentImage.id === image.id && "ring-2 ring-gray-900"
              )}
            >
              <Image
                src={image.imageUrl}
                alt={image.altText || keyboardName}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};