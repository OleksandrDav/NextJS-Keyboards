"use client"

import React from 'react';
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox';
import { Button, Input } from '../ui';

type Item = FilterChecboxProps

interface Props {
    title: string;
    items: Item[];
    defaultItems: Item[];
    limit?: number;
    searchInputPlaceholder?: string;
    onChange?: (value: string[]) => void;
    defaultvalue?: string[];
    className?: string;
}

export const CheckboxFiltersGroup: React.FC<Props> = (
    {
        title,
        items,
        defaultItems,
        limit = 3,
        searchInputPlaceholder = 'Search...',
        onChange,
        defaultvalue,
        className
    }
) => {

    const [showAll, setShowAll] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    }


    const list = showAll
        ? items.filter((item) => item.text.toLowerCase().includes(searchValue.toLowerCase()))
        : defaultItems.slice(0, limit);

    return (
        <div className={className}>
            <p className='font-bold mb-3'>{title}</p>

            {showAll && items.length > 6 &&
                <div className='mb-5'>
                    <Input
                        placeholder={searchInputPlaceholder}
                        className='bg-gray-50 border-none'
                        onChange={onSearchInputChange}
                        value={searchValue}
                    />

                </div>

            }

            <div className='flex flex-col gap-4 max-h-56 overflow-auto scrollbar'>
                {list.map((item, index) => (
                    <FilterCheckbox
                        key={index}
                        text={item.text}
                        value={item.value}
                        onCheckedChange={(ids) => console.log(ids)}
                        checked={false}
                        endAdornment={item.endAdornment}
                    />
                ))}
            </div>

            {items.length > limit && (
                <div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
                    <button onClick={() => setShowAll(!showAll)} className='text-primary mt-3'>
                        <span>{!showAll ? `+ Show All` : `- Hide`}</span>
                    </button>
                </div>
            )}
        </div>
    );
};
