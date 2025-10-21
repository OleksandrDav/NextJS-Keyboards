import Link from "next/link";
import React from "react";
import { Title } from "./title";
import { Button } from "../ui";
import { Plus } from "lucide-react";

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
  imageUrl: string;
  colors: string[];
  className?: string;
}

export const ProductCard: React.FC<Props> = ({
  id,
  name,
  price,
  imageUrl,
  colors,
  className,
}) => {
  return (
    <div className={className}>
      <Link href={`/product/${id}`}>
        <div className="flex justify-center items-center h-[260px]">
          <img
            className="w-full h-auto max-w-[260px] max-h-[260px] object-contain"
            src={imageUrl}
            alt={name}
          />
        </div>

        <Title text={name} size="sm" className="mb-1 mt-3 front-bold" />
        <div className="flex items-center gap-2 mt-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={(e) => {
                e.preventDefault(); // prevent Link navigation
              }}
              className={`w-5 h-5 rounded-full border-2 border-gray-300 hover:border-3 cursor-pointer`}
              style={{
                backgroundColor: COLOR_MAP[c] || c,
              }}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mt-4 ">
          <span className="text-[20px] whitespace-nowrap">
            from <b>{price} $</b>
          </span>
          <Button
            variant="secondary"
            className="text-base font-bold flex-shrink-0"
          >
            <Plus size={20} className="mr-1" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};
