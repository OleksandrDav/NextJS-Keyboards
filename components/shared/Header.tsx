import { cn } from '@/lib/utils';
import React from 'react';
import { Container } from './container';
import Image from 'next/image';
import { Button } from '../ui';
import { ArrowRight, ShoppingCart, User } from 'lucide-react';

interface Props {
    className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className='flex items-center justify-between'>

                {/* Left side */}
                <div className='flex items-center space-x-2'>
                    {/* Logo - Smaller on mobile */}
                    <div className='w-24'>
                        <Image 
                            src='/logo.png' 
                            alt='Next Keyboards' 
                            width={150} 
                            height={50} 
                            className='w-full h-auto'
                        />
                    </div>
                    <div className='hidden md:block'>
                        <h1 className='text-2xl uppercase font-bold'>Next Keyboards</h1>
                        <p className='text-sm text-gray-400 leading-3'>Mechanical Keyboards & Keycaps</p>
                    </div>
                </div>

                {/* Right side */}
                <div className='flex items-center gap-3'>
                    {/* Sign In Button - Only icon on mobile */}
                    <Button variant='outline' className='flex items-center gap-1 p-2 md:p-2.5'>
                        <User size={16} />
                        <span className='hidden md:inline'>Sign In</span>
                    </Button>

                    {/* Cart Block - Only icon on mobile */}
                    <div>
                        <Button className='group relative p-2 md:p-2.5'>
                            <b className='hidden md:inline'>65 $</b>
                            <span className='h-full w-[1px] bg-white/30 mx-2 hidden md:inline' />
                            <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
                                <ShoppingCart size={16} className="relative mb-0.5" strokeWidth={2} />
                                <b className='md:inline'>3</b>
                            </div>
                            <ArrowRight
                                size={20}
                                className="absolute right-4 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 hidden md:block"
                            />
                        </Button>
                    </div>
                </div>

            </Container>
        </header>
    );
};