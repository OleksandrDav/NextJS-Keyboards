import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ColorSelector } from "./color-selector";

interface ColorVariant {
  id: string;
  colorName: string;
  colorHex: string;
  imageUrl: string;
}

interface Props {
  id: string;
  name: string;
  price: string;
  imageUrl?: string;
  discountPercentage: number;
  colorVariants: ColorVariant[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  discountPercentage,
  colorVariants,
  className 
}) => {
  const defaultImage = imageUrl || colorVariants[0]?.imageUrl || "https://www.mchose.store/cdn/shop/files/mchose-official-mountains-gradient-mist-blue-switch-mchose-gx87s-aluminum-custom-mechanical-keyboard-1166639623.png?v=1754474595&width=1000";

  return (
    <div className={cn("w-full max-w-[400px] mx-auto", className)}>
      <Link href={`/keyboard/${id}`}>
        <div className="flex flex-col h-full">
          <ColorSelector
            colorVariants={colorVariants}
            defaultImageUrl={defaultImage}
            discountPercentage={discountPercentage}
          />

          <Title text={name} size="sm" className="mb-1 mt-3 font-bold min-h-[3rem] flex-1" />

          <div className="flex justify-between items-center mt-auto pt-4">
            <span className="text-[18px] sm:text-[20px] whitespace-nowrap">
              from <b>{price} $</b>
            </span>
            <Button variant="secondary" className="text-base font-bold flex-shrink-0">
              <Plus size={20} className="mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
};