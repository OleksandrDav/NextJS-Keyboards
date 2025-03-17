import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
    className?: string
}

const cats = ['98% Layout', '80% Layout', '75% Layout', '65% Layout', '60% Layout'];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {cats.map((cat, index) => (
                <a className={cn(
                    'flex item-center font-bold h-11 rounded-2xl px-5',
                    activeIndex === index && 'bg-white shadow-md shadow-gray-200 text-primary h-11 ')} key={index}>
                    <button>
                        {cat}
                    </button>
                </a>
            ))}
        </div>
    );
};
