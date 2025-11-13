'use client'

import { createSlug } from '@/shared/lib/create-slug';
import { cn } from '@/shared/lib/utils';
import { useCategoryStore } from '@/shared/store/category';
import React from 'react';

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const Categories: React.FC<Props> = ({ className, layouts }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    
    const scrollToCategory = (slug: string) => {
        const element = document.getElementById(slug);
        if (element) {
            // Get header and topbar heights for offset
            const header = document.querySelector('header') as HTMLElement | null;
            const topbar = document.querySelector('[data-topbar]') as HTMLElement | null;
            
            const headerHeight = header?.offsetHeight || 0;
            const topbarHeight = topbar?.offsetHeight || 0;
            const offset = headerHeight + topbarHeight + 16; 
            
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {layouts.map(({name, id}) => {
                const slug = createSlug(name);
                
                return (
                    <button
                        key={id}
                        onClick={() => scrollToCategory(slug)}
                        className={cn(
                            'flex items-center font-bold h-11 rounded-2xl px-5 transition-colors',
                            categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary'
                        )}
                        type="button"
                    >
                        {name}
                    </button>
                );
            })}
        </div>
    );
};