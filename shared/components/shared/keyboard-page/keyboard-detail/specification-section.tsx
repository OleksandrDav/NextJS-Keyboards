import React from 'react';

interface Props {
    name?: string;
    className?: string
}

export const SpecificationSection: React.FC<Props> = ({ className, name }) => {
    return (
        <div className="mt-16 border-t pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Layout</span>
              <span className="font-semibold">{name}</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Switch Type</span>
              <span className="font-semibold">Customizable</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Connectivity</span>
              <span className="font-semibold">USB-C • Bluetooth 5.1</span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Backlight</span>
              <span className="font-semibold">RGB Per-key</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Build Material</span>
              <span className="font-semibold">Aluminum Frame</span>
            </div>
            <div className="flex justify-between py-3 border-b">
              <span className="text-gray-600">Weight</span>
              <span className="font-semibold">1.2 kg</span>
            </div>
          </div>
        </div>
      </div>
    );
};
