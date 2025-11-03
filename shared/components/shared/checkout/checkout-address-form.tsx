import React from 'react';
import { FormInput } from '../form/form-input';
import { FormTextarea } from '../form/form-textarea';
import { WhiteBlock } from './white-block';

interface Props {
    className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
    return (
        <WhiteBlock title="Address Details">
            <div className="space-y-3">
                <FormInput name="address" placeholder="Street address" className="text-base " />
                <div className="grid grid-cols-2 gap-4">
                  <FormInput name="city" placeholder="City" className="text-base" />
                  <FormInput name="zipCode" placeholder="ZIP / Postal code" className="text-base" />
                </div>
                <FormTextarea
                  name="deliveryInstructions"
                  placeholder="Delivery instructions (optional)"
                  rows={4}
                  className="text-base resize-none"
                />
              </div>
          </WhiteBlock>
    );
};
