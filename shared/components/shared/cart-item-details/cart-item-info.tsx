import { cn } from "@/shared/lib/utils";

interface Props {
  name: string;
  details: string;
  truncate?: number | { default: number; xl: number };
  className?: string;
}

export const CartItemInfo: React.FC<Props> = ({ name, details, className, truncate = 19 }) => {
  const getTruncateValue = () => {
    if (typeof truncate === 'object') {
      return truncate;
    }
    return { default: truncate, xl: truncate };
  };

  const truncateValues = getTruncateValue();
  
  const truncateName = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        {/* Default version (below 1024px and above 1280px) */}
        <h2 className="text-lg font-bold flex-1 leading-6 lg:hidden xl:block">
          {truncateName(name, truncateValues.default)}
        </h2>
        {/* LG version (1024px to 1280px) */}
        <h2 className="text-lg font-bold flex-1 leading-6 hidden lg:block xl:hidden">
          {truncateName(name, truncateValues.xl)}
        </h2>
      </div>
      {details && <p className="text-sm text-gray-400 w-[90%]">{details}</p>}
    </div>
  );
};