'use client'

import { cn, createSlug } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import { Layout } from '@prisma/client';
import React from 'react';

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, layouts }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {layouts.map(({name, id}) => {
                const slug = createSlug(name);
                
                return (
                    <a 
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5',
                            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                        )} 
                        href={`#${slug}`} 
                        key={id}
                    >
                        {name}
                    </a>
                );
            })}
        </div>
    );
};
