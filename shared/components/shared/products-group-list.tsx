"use client";

import { createSlug } from "@/shared/lib/create-slug";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import React, { useRef } from "react";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";
import { KeyboardDetails } from "@/@types/keyboard";

interface Props {
  title: string;
  items: KeyboardDetails[];
  layoutId: string;
  listClassName?: string;
  className?: string;
}

export const ProductGroupList: React.FC<Props> = ({ title, items, listClassName, layoutId, className }) => {
  const setActiveLayoutId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef as unknown as React.RefObject<HTMLElement>, {
    threshold: 0.6,
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveLayoutId(layoutId);
    }
  }, [layoutId, intersection?.isIntersecting, title]);

  const slug = createSlug(title);

  return (
    <div className={className} id={slug} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          "grid gap-6",
          "grid-cols-[repeat(auto-fill,minmax(280px,1fr))]",
          "sm:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]",
          "lg:grid-cols-[repeat(auto-fill,minmax(320px,1fr))]",
          listClassName
        )}
      >
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.basePrice.toFixed(2)}
            imageUrl={product.colorVariants[0]?.imageUrl}
            discountPercentage={product.discountPercentage}
            colorVariants={product.colorVariants.map((variant) => ({
              id: variant.id,
              colorName: variant.colorName,
              colorHex: variant.colorHex,
              imageUrl: variant.imageUrl,
            }))}
          />
        ))}
      </div>
    </div>
  );
};
