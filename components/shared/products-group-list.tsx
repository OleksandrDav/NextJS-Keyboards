"use client";

import React, { useRef } from "react";
import { useIntersection } from "react-use";
import { Title } from "./title";
import { cn, createSlug } from "@/lib/utils";
import { ProductCard } from "./product-card";
import { useCategoryStore } from "@/store/category";
import { create } from "domain";

interface Props {
  title: string;
  items: any[];
  layoutId: string;
  listClassName?: string;
  className?: string;
}

export const ProductGroupList: React.FC<Props> = ({
  title,
  items,
  listClassName,
  layoutId,
  className,
}) => {
  const setActiveLayoutId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.6
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveLayoutId(layoutId);
    }
  }, [layoutId, intersection?.isIntersecting, title]);

  const slug = createSlug(title);

  console.log(items)

  return (
    <div className={className} id={slug} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div
        className={cn(
          "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3",
          listClassName
        )}
      >
        {items.map((product, index) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.basePrice}
            imageUrl={product?.colorVariants[0].imageUrl}
          />
        ))}
      </div>
    </div>
  );
};
