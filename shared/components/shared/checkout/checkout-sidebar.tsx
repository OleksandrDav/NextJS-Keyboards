import { ArrowRight, Percent, ShoppingBasket, Truck } from "lucide-react";
import React from "react";
import { Button } from "../../ui";
import { CheckoutResultDetails } from "./checkout-result-details";
import { cn } from "@/shared/lib/utils";
import { WhiteBlock } from "./white-block";
import { Skeleton } from "../../ui/skeleton";

interface Props {
  totalAmount: string;
  loading?: boolean;
  className?: string;
}

export const CheckoutSidebar: React.FC<Props> = ({ className, totalAmount, loading }) => {
  const SHIPPING_COST = 5;
  const VAT_RATE = 0.21;

  const totalWithVAT = Number(totalAmount);
  const basePrice = totalWithVAT / (1 + VAT_RATE);
  const vatPrice = totalWithVAT - basePrice;
  const finalPrice = totalWithVAT + SHIPPING_COST;

  return (
    <div className={cn("w-[450px]", className)}>
      <WhiteBlock className="p-6 pt-3.5 sticky top-4">
        <CheckoutResultDetails
          title={
            <div className="flex items-center">
              <ShoppingBasket className="mr-2" />
              Subtotal (excl. VAT):
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-24" /> : `${basePrice.toFixed(2)} $`}
        />

        <CheckoutResultDetails
          title={
            <div className="flex items-center">
              <Percent className="mr-2" />
              VAT (21%):
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-24" /> : `${vatPrice.toFixed(2)} $`}
        />

        <CheckoutResultDetails
          title={
            <div className="flex items-center">
              <Truck className="mr-2" />
              Shipping:
            </div>
          }
          value={loading ? <Skeleton className="h-6 w-24" /> : `${SHIPPING_COST.toFixed(2)} $`}
        />

        <div className="flex justify-between items-center mt-3">
          <span className="text-xl font-semibold text-neutral-700">Total:</span>
          {loading ? (
            <Skeleton className="h-[45px] w-32" />
          ) : (
            <span className="text-[30px] font-extrabold text-black">
              {finalPrice.toFixed(2)} $
            </span>
          )}
        </div>

        <Button
          type="submit"
          className="w-full h-14 rounded-2xl text-base font-bold mt-2"
        >
          Proceed to Payment
          <ArrowRight className="w-5 ml-2" />
        </Button>
      </WhiteBlock>
    </div>
  );
};