import Link from 'next/link';
import React from 'react';
import { Title } from './title';
import { Button } from '../ui';
import { Plus } from 'lucide-react';

interface Props {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    className?: string
}

export const ProductCart: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
    return (
        <div className={className}>
            <Link href={`/product/${id}`}>
                <div className='flex justify-center items-center h-[260px]'>
                    <img className='w-full h-auto max-w-[260px] max-h-[260px] object-contain' src={imageUrl} alt={name}/>
                </div>

                <Title text={name} size='sm' className='mb-1 mt-3 front-bold'/>
                <p className='text-sm text-gray-400'>
                    Cherry MX, Gateron, Kailh, Outemu
                </p>

                <div className='flex justify-between items-center mt-4 '>
                    <span className='text-[20px] whitespace-nowrap'>
                        from <b>{price} $</b>
                    </span>
                    <Button variant='secondary' className='text-base font-bold flex-shrink-0'>
                        <Plus size={20} className='mr-1'/>
                        Add to Cart
                    </Button>
                </div>
            </Link>
        </div>
    );
};
