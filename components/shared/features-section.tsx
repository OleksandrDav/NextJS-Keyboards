import { Check, Shield, Truck } from 'lucide-react';
import React from 'react';

interface Props {
    className?: string
}

export const FeaturesSection: React.FC<Props> = ({ className }) => {
    return (
        <div className="grid grid-cols-3 gap-4 pt-6 border-t">
            <div className="text-center">
              <Truck size={24} className="mx-auto text-gray-600 mb-2" />
              <div className="text-sm font-semibold">Free Shipping</div>
              <div className="text-xs text-gray-600">Over $100</div>
            </div>
            <div className="text-center">
              <Check size={24} className="mx-auto text-gray-600 mb-2" />
              <div className="text-sm font-semibold">In Stock</div>
              <div className="text-xs text-gray-600">Ready to ship</div>
            </div>
            <div className="text-center">
              <Shield size={24} className="mx-auto text-gray-600 mb-2" />
              <div className="text-sm font-semibold">2 Year Warranty</div>
              <div className="text-xs text-gray-600">Full coverage</div>
            </div>
          </div>
    );
};
