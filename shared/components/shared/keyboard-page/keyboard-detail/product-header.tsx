import React from "react";

interface Props {
  name: string;
  layoutName: string;
}

export const ProductHeader: React.FC<Props> = ({ name, layoutName }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
      <div className="flex items-center gap-2 text-sm text-ring">
        <span>{layoutName}</span>
        <span>•</span>
        <span>Mechanical Keyboard</span>
      </div>
    </div>
  );
};