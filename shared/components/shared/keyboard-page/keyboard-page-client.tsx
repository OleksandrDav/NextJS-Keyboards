"use client";

import { Container } from "@/shared/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/shared/components/shared/breadcrumb";
import { useKeyboardDetails } from "@/shared/hooks/use-keyboard-details";
import { KeyboardWithRelations } from "@/@types/keyboard";
import {
  AddToCartButton,
  ColorSelector,
  FeaturesSection,
  ImageGallery,
  PriceDisplay,
  ProductDescription,
  ProductHeader,
  SpecificationSection,
  SwitchSelector,
} from "./keyboard-detail";

type KeyboardPageProps = {
  keyboard: KeyboardWithRelations;
};

export default function KeyboardPageClient({ keyboard }: KeyboardPageProps) {
  const {
    selectedColorVariant,
    selectedSwitch,
    currentImage,
    currentImages,
    finalPrice,
    handleColorChange,
    handleSwitchChange,
    handleImageChange,
  } = useKeyboardDetails(keyboard);

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
        <ImageGallery
          images={currentImages}
          currentImage={currentImage}
          onImageChange={handleImageChange}
          discountPercentage={keyboard.discountPercentage}
          keyboardName={keyboard.name}
        />

        {/* Product Info */}
        <div className="space-y-4">
          <ProductHeader
            name={keyboard.name}
            layoutName={keyboard.layout.name}
          />

          <PriceDisplay
            finalPrice={finalPrice}
            basePrice={Number(keyboard.basePrice)}
            discountPercentage={keyboard.discountPercentage}
          />

          <ProductDescription description={keyboard.description} />

          <ColorSelector
            variants={keyboard.colorVariants}
            selectedVariant={selectedColorVariant}
            onSelect={handleColorChange}
          />

          <SwitchSelector
            switches={keyboard.switches}
            selectedSwitch={selectedSwitch}
            onSelect={handleSwitchChange}
          />

          <AddToCartButton finalPrice={finalPrice} disabled={!selectedSwitch} />

          <FeaturesSection />
        </div>
      </div>

      {/* Specifications Section */}
      <SpecificationSection name={keyboard.layout.name} />
    </Container>
  );
}
