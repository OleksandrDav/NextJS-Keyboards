import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";
import { cn } from "@/shared/lib/utils";

const COLOR_MAP: Record<string, string> = {
  blue: "#3B82F6",
  green: "#22C55E",
  black: "#000000",
  white: "#E5E7EB",
  pink: "#EC4899",
  orange: "#F97316",
};

interface Props {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  className,
}) => {
  return (
    <div className={cn("min-w-[290px]", className)}>
      <Link href={`/keyboard/${id}`}>
        <div className="flex flex-col h-full">
          <div className="flex justify-center items-center h-[260px]">
            <img
              className="w-full h-auto max-w-[260px] max-h-[260px] object-contain"
              src={
                imageUrl ||
                "https://www.mchose.store/cdn/shop/files/mchose-official-mountains-gradient-mist-blue-switch-mchose-gx87s-aluminum-custom-mechanical-keyboard-1166639623.png?v=1754474595&width=1000"
              }
              alt={name}
            />
          </div>
          
          <Title text={name} size="sm" className="mb-1 mt-3 font-bold min-h-[3rem]" />

          <div className="flex justify-between items-center mt-auto pt-4">
            <span className="text-[20px] whitespace-nowrap">
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