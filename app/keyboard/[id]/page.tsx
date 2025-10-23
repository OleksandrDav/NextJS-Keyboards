import { Container } from "@/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/shared/breadcrumb";
import { FeaturesSection } from "@/components/shared/features-section";
import { SpecificationSection } from "@/components/shared/specification-section";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma/prisma-client";
import {
  ArrowRight,
  ShoppingCart
} from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function KeyboardPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const keyboard = await prisma.keyboard.findFirst({
    where: { id: String(id) },
    include: {
      layout: true,
      switches: true,
      colorVariants: {
        include: {
          additionalImages: true,
        },
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!keyboard) {
    return notFound();
  }

  const defaultColorVariant =
    keyboard.colorVariants.find((variant) => variant.isDefault) ||
    keyboard.colorVariants[0];
    
  const finalPrice =
    Number(keyboard.basePrice) * (1 - keyboard.discountPercentage / 100);

  return (
    <Container className="py-8">
      {/* Breadcrumb */}
      <Breadcrumb className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{keyboard.name}</BreadcrumbItem>
      </Breadcrumb>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square relative bg-gray-100 rounded-2xl overflow-hidden">
            {defaultColorVariant && (
              <Image
                src={defaultColorVariant.imageUrl}
                alt={keyboard.name}
                fill
                className="object-cover"
                priority
              />
            )}
            {keyboard.discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                -{keyboard.discountPercentage}%
              </div>
            )}
          </div>

          {/* Additional Images */}
          {defaultColorVariant?.additionalImages &&
            defaultColorVariant.additionalImages.length > 0 && (
              <div className="grid grid-cols-4 gap-3">
                {defaultColorVariant.additionalImages.map((image) => (
                  <div
                    key={image.id}
                    className="aspect-square relative bg-gray-100 rounded-xl overflow-hidden cursor-pointer"
                  >
                    <Image
                      src={image.imageUrl}
                      alt={image.altText || keyboard.name}
                      fill
                      className="object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            )}
        </div>

        {/* Product Info */}
        <div className="space-y-4">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {keyboard.name}
            </h1>
            <div className="flex items-center gap-2 text-sm text-ring">
              <span>{keyboard.layout.name}</span>
              <span>•</span>
              <span>Mechanical Keyboard</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-gray-900">
              ${finalPrice.toFixed(2)}
            </span>
            {keyboard.discountPercentage > 0 && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${Number(keyboard.basePrice).toFixed(2)}
                </span>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-semibold">
                  Save {keyboard.discountPercentage}%
                </span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="prose prose-gray">
            <p className="text-gray-600 leading-relaxed">
              {keyboard.description ||
                "Premium mechanical keyboard with exceptional build quality and customizable features."}
            </p>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Color</h3>
            <div className="flex gap-3">
              {keyboard.colorVariants.map((variant) => {
                const isOutOfStock = !variant.inStock;
                const isSelected = variant.id === defaultColorVariant?.id;

                return (
                  <button
                    key={variant.id}
                    disabled={isOutOfStock}
                    className={cn(
                      "w-12 h-12 rounded-full border-2 transition-all relative",
                      isSelected
                        ? "border-gray-900 ring-2 ring-gray-900 ring-opacity-20"
                        : "border-gray-300 hover:border-gray-400",
                      isOutOfStock && "opacity-40 cursor-not-allowed"
                    )}
                    style={{ backgroundColor: variant.colorHex }}
                    title={
                      isOutOfStock
                        ? `${variant.colorName} - Out of Stock`
                        : variant.colorName
                    }
                  >
                    {/* Out of stock indicator */}
                    {isOutOfStock && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-full h-0.5 bg-gray-500 rotate-45 transform origin-center"></div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch Selection - Centered Pill Style */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900">Switch Type</h3>
            <div className="flex flex-wrap gap-2">
              {keyboard.switches.map((switchItem) => {
                const isOutOfStock = !switchItem.inStock;

                return (
                  <button
                    key={switchItem.id}
                    disabled={isOutOfStock}
                    className={cn(
                      "px-4 py-2.5 border rounded-full transition-all",
                      "flex flex-col items-center justify-center text-center",
                      "min-w-[140px] h-[60px] flex-shrink-0", // Fixed width and height
                      isOutOfStock
                        ? "opacity-40 cursor-not-allowed border-gray-200"
                        : "border-gray-200 hover:border-gray-900 hover:bg-gray-50"
                    )}
                  >
                    <div
                      className={cn(
                        "font-semibold text-sm leading-tight",
                        isOutOfStock ? "text-gray-500" : "text-gray-900"
                      )}
                    >
                      {switchItem.name}
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <span
                        className={cn(
                          "text-xs capitalize",
                          isOutOfStock ? "text-gray-400" : "text-gray-600"
                        )}
                      >
                        {switchItem.type}
                      </span>
                      {!isOutOfStock && (
                        <span className="text-green-600 font-semibold text-xs">
                          +${Number(switchItem.priceModifier).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <Button className="w-full group relative overflow-hidden">
              <div className="flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                <span>Add to Cart • ${finalPrice.toFixed(2)}</span>
              </div>
              <ArrowRight
                size={20}
                className="relative left-1 transition duration-300 opacity-0 group-hover:opacity-100"
              />
            </Button>
          </div>

          {/* Features */}
          <FeaturesSection />
        </div>
      </div>

      {/* Specifications Section */}
      <SpecificationSection name={keyboard.layout.name} />
    </Container>
  );
}
