import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  details: string;
  truncate?: number;
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className, truncate=19 }) => {
  const truncateName = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{truncateName(name, truncate)}</h2>
      </div>
      {details && <p className="text-sm text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};
