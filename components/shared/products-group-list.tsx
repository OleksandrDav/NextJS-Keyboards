import React from 'react';
import { Title } from './title';
import { cn } from '@/lib/utils';
import { ProductCart } from './product-cart';

interface Props {
    title: string;
    items: any[];
    categoryId: number;
    listClassName?: string;
    className?: string
}

export const ProductGroupList: React.FC<Props> = ({ title, items, listClassName, categoryId, className }) => {
    return (
        <div className={className}>
            <Title text={title} size="lg" className='font-extrabold mb-5' />

            <div className={cn('grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3', listClassName)}>
                {items.map((product, index) => (
                    <ProductCart
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.items[0].price}
                        imageUrl={product.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};
