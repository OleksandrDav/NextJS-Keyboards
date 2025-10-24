type ProductDescriptionProps = {
  description: string | null;
};

export function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className="prose prose-gray">
      <p className="text-gray-600 leading-relaxed">
        {description ||
          "Premium mechanical keyboard with exceptional build quality and customizable features."}
      </p>
    </div>
  );
}