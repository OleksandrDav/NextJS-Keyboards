'use client'

import React, { useRef } from 'react';
import { useIntersection } from 'react-use';
import { Title } from './title';
import { cn, createSlug } from '@/lib/utils';
import { ProductCard } from './product-card';
import { useCategoryStore } from '@/store/category';
import { create } from 'domain';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    listClassName?: string;
    className?: string
}

export const ProductGroupList: React.FC<Props> = ({ title, items, listClassName, categoryId, className }) => {
    const setActiveCategoryId = useCategoryStore((state) => state.setActiveId);
    const intersectionRef = useRef(null);
    const intersection = useIntersection(intersectionRef, {
        threshold: 0.4,
    });

    React.useEffect(() => {
        if (intersection?.isIntersecting){
            setActiveCategoryId(categoryId);
            
        }
    }, [categoryId, intersection?.isIntersecting, title]);

    const slug = createSlug(title);

    return (
        <div className={className} id={slug} ref={intersectionRef}>
            <Title text={title} size="lg" className='font-extrabold mb-5' />

            <div className={cn('grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3', listClassName)}>
                {items.map((product, index) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                        colors={product.colors}
                    />
                ))}
            </div>
        </div>
    );
};
