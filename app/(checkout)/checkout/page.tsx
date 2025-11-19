"use client";
import { createOrder } from "@/app/actions";
import { Container, Title } from "@/shared/components/shared";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import { CheckoutCartSummary } from "@/shared/components/shared/checkout/checkout-cart-summary";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { CheckoutPersonalInfoForm } from "@/shared/components/shared/checkout/checkout-personal-info-form";
import { CheckoutSidebar } from "@/shared/components/shared/checkout/checkout-sidebar";
import { useCart } from "@/shared/hooks/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "@/shared/components/ui/spinner";

export default function CheckoutPage() {
  const { totalAmount, items, removeCartItem, onClickCountButton, loading } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data: CheckoutFormValues) => {
    try {
      setIsSubmitting(true);
      const result = await createOrder(data);

      if (result.success) {
        console.log("Order created successfully:", result.orderId);
        toast.success("Order created successfully!");
        if (result.paymentUrl) {
          location.href = result.paymentUrl;
        }
      } else {
        console.error("Order creation failed:", result.error);
        toast.error("Failed to create order. Please try again.");
        form.setError("root", {
          message: result.error || "Failed to create order",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      form.setError("root", {
        message: "An unexpected error occurred",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      zipCode: "",
      deliveryInstructions: "",
    },
  });

  return (
    <>
      {/* Overlay with spinner */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <Spinner className="text-primary" size="lg" />
            <p className="text-lg font-semibold text-gray-700">Processing your payment...</p>
          </div>
        </div>
      )}

      <Container className="mt-2">
        <Title text="Checkout" size="lg" className="font-extrabold mb-3" />
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col xl:flex-row gap-10">
              <div className="flex flex-col gap-8 flex-1 xl:mb-20">
                <CheckoutCartSummary
                  items={items}
                  removeCartItem={removeCartItem}
                  onClickCountButton={onClickCountButton}
                  loading={loading}
                />

                <CheckoutPersonalInfoForm />

                <CheckoutAddressForm />
              </div>

              <CheckoutSidebar totalAmount={totalAmount} loading={loading || isSubmitting} />
            </div>
          </form>
        </FormProvider>
      </Container>
    </>
  );
}
