import { Container, Filters, Title, TopBar } from "@/shared/components/shared";
import { ProductGroupList } from "@/shared/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";
import { serializePrismaData } from "@/shared/lib/serialize";
import { Suspense } from "react";
import { findKeyboards, GetSearchParams } from "@/shared/lib/find-keyboards";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const layouts = await findKeyboards(searchParams);

  const topBarLayouts = layouts.map((l) => ({ id: l.id, name: l.name }));

  // Serialize the layouts data (converts Decimal fields to numbers)
  const serializedLayouts = serializePrismaData(layouts);

  return (
    <>
      <Container className="mt-5">
        <Title text="All Keyboards" size="lg" className="font-extrabold" />
      </Container>

      <TopBar layouts={topBarLayouts} />

      <Container className="mt-9 pb-14">
        <div className="flex gap-[60px]">
          {/* Filters */}
          <div>
            <Suspense fallback={<div>Loading filters...</div>}>
              <Filters />
            </Suspense>
          </div>

          {/* Keyboards */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {serializedLayouts.map(
                (layout) =>
                  layout.keyboards.length > 0 && (
                    <ProductGroupList
                      key={layout.id}
                      title={layout.name}
                      layoutId={layout.id}
                      items={layout.keyboards}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
