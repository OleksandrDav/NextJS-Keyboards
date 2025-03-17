'use client'

import { cn } from '@/lib/utils';
import { useCategoryStore } from '@/store/category';
import React from 'react';

interface Props {
    className?: string
}

const cats = [
    { id: 1, name: '98% Layout' },
    { id: 2, name: '80% Layout' },
    { id: 3, name: '75% Layout' },
    { id: 4, name: '65% Layout' },
    { id: 5, name: '60% Layout' }
];

export const Categories: React.FC<Props> = ({ className }) => {
    const categoryActiveId = useCategoryStore((state) => state.activeId);
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {cats.map(({name, id}, index) => (
                <a className={cn(
                    'flex item-center font-bold h-11 rounded-2xl px-5',
                    categoryActiveId === id && 'bg-white shadow-md shadow-gray-200 text-primary h-11 ')} href={`/#${name}`} key={index}>
                    <button>
                        {name}
                    </button>
                </a>
            ))}
        </div>
    );
};
