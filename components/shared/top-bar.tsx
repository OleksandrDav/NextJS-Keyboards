import React from 'react';
import { Categories } from './categories';
import { SortPopup } from './sort-popup';
import { cn } from '@/lib/utils';
import { Container } from './container';
import { Layout } from '@prisma/client';

type TopBarLayout = { id: string; name: string };

interface Props {
  layouts: TopBarLayout[];
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className, layouts }) => {
    return (
        <div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
            <Container className='flex items-center justify-between'>
                <Categories layouts={layouts} />
                <SortPopup />
            </Container>
        </div>
    );
};
