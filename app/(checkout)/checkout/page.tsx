"use client";
import { Container, Title } from "@/shared/components/shared";
import { CheckoutAddressForm } from "@/shared/components/shared/checkout/checkout-address-form";
import { CheckoutCartSummary } from "@/shared/components/shared/checkout/checkout-cart-summary";
import { checkoutFormSchema, CheckoutFormValues } from "@/shared/components/shared/checkout/checkout-form-schema";
import { CheckoutPersonalInfoForm } from "@/shared/components/shared/checkout/checkout-personal-info-form";
import { CheckoutSidebar } from "@/shared/components/shared/checkout/checkout-sidebar";
import { useCart } from "@/shared/hooks/use-cart";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

export default function CheckoutPage() {
  const { totalAmount, items, updateItemQuantity, removeCartItem, onClickCountButton, loading } = useCart();

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Checkout form submitted:", data);
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
    <Container className="mt-5">
      <Title text="Checkout" size="lg" className="font-extrabold mb-8" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-10">
            <div className="flex flex-col gap-8 flex-1 mb-20">
              <CheckoutCartSummary
                items={items}
                removeCartItem={removeCartItem}
                onClickCountButton={onClickCountButton}
                loading={loading}
              />

              <CheckoutPersonalInfoForm />

              <CheckoutAddressForm />
            </div>

            <CheckoutSidebar totalAmount={totalAmount} loading={loading} />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
