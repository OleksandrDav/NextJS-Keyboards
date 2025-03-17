import React from 'react';
import { Title } from './title';
import { FilterCheckbox } from './filter-checkbox';
import { Input } from '../ui';
import { RangeSlider } from './range-slider';
import { CheckboxFiltersGroup } from './checkbox-filters-group';

interface Props {
    className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Title text="Filters" size="sm" className='mb-5 font-bold' />

            {/* Top filters - color (checkboxes) */}
            <div className='flex flex-col gap-4'>
                <FilterCheckbox text="Blue" value="1" />
                <FilterCheckbox text="Green" value="2" />
                <FilterCheckbox text="Black" value="3" />
                <FilterCheckbox text="White" value="4" />
                <FilterCheckbox text="Purple" value="5" />
                <FilterCheckbox text="Orange" value="6" />
            </div>


            {/* Middle filters - price range */}
            <div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
                <p className='font-bold mb-3'>Price from and to:</p>
                <div className='flex gap-3 mb-3'>
                    <Input type='number' placeholder='0' min={0} max={200} defaultValue={0} />
                    <Input type='number' placeholder='200' min={10} max={200} defaultValue={200} />
                </div>
                <RangeSlider min={0} max={200} step={10} value={[0, 200]} />
            </div>

            {/* Bottom filters - rating (checkboxes) */}

            <CheckboxFiltersGroup
                title="Swtiches"
                className='mt-5'
                limit={3}
                defaultItems={[
                    {
                        text: 'Cherry MX',
                        value: '1'
                    },
                    {
                        text: 'Gateron',
                        value: '2'
                    },
                    {
                        text: 'Kailh',
                        value: '3'
                    },
                    {
                        text: 'Outemu',
                        value: '4'
                    },
                    {
                        text: 'Razer',
                        value: '5'
                    },
                    {
                        text: 'Zealios',
                        value: '6'
                    }
                ]}
                items={[
                    {
                        text: 'Cherry MX',
                        value: '1'
                    },
                    {
                        text: 'Gateron',
                        value: '2'
                    },
                    {
                        text: 'Kailh',
                        value: '3'
                    },
                    {
                        text: 'Outemu',
                        value: '4'
                    },
                    {
                        text: 'Razer',
                        value: '5'
                    },
                    {
                        text: 'Zealios',
                        value: '6'
                    }
                ]}
            />
        </div>
    );
};
