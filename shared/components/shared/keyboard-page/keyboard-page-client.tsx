"use client";

import { Container } from "@/shared/components/shared";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/shared/components/shared/breadcrumb";
import { KeyboardWithRelations } from "@/@types/keyboard";
import {
  FeaturesSection,
  SpecificationSection,
} from "./keyboard-detail";
import { KeyboardDetailContent } from "./keyboard-detail-content";

type KeyboardPageProps = {
  keyboard: KeyboardWithRelations;
};

export default function KeyboardPageClient({ keyboard }: KeyboardPageProps) {
  return (
    <Container className="py-8">
      <Breadcrumb className="mb-6">
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>{keyboard.name}</BreadcrumbItem>
      </Breadcrumb>

      <KeyboardDetailContent keyboard={keyboard} />

      {/* Page-specific sections */}
      <div className="mt-12 space-y-8">
        <FeaturesSection />
        <SpecificationSection name={keyboard.layout.name} />
      </div>
    </Container>
  );
}