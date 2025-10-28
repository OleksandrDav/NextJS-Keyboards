"use client";

import { createSlug } from "@/shared/lib/create-slug";
import { cn } from "@/shared/lib/utils";
import { useCategoryStore } from "@/shared/store/category";
import React, { useRef } from "react";
import { useIntersection } from "react-use";
import { ProductCard } from "./product-card";
import { Title } from "./title";

interface Props {
  title: string;
  items: any[];
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

  console.log(items);

  return (
    <div className={className} id={slug} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid gap-10 grid-cols-[repeat(auto-fit,minmax(290px,1fr))]", listClassName)}>
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
