import { Container, Filters, MobileControls, TopBar } from "@/shared/components/shared";
import { ProductGroupList } from "@/shared/components/shared/products-group-list";
import { findKeyboards, GetSearchParams } from "@/shared/lib/find-keyboards";
import { serializePrismaData } from "@/shared/lib/serialize";
import { Search } from "lucide-react";
import { Suspense } from "react";

export default async function Home({ searchParams }: { searchParams: Promise<GetSearchParams> }) {
  // Await searchParams here in the page component
  const params = await searchParams;
  
  // Now pass the resolved params to findKeyboards
  const layouts = await findKeyboards(params);

  const topBarLayouts = layouts.map((l) => ({ id: l.id, name: l.name }));

  // Serialize the layouts data (converts Decimal fields to numbers)
  const serializedLayouts = serializePrismaData(layouts);

  // Check if there are any keyboards at all
  const hasKeyboards = serializedLayouts.some(layout => layout.keyboards.length > 0);

  return (
    <>
      <TopBar layouts={topBarLayouts} />

      <Container className="mt-4 pb-14">
        <div className="flex gap-[60px]">
          <div className="hidden lg:block">
            <Suspense fallback={<div>Loading filters...</div>}>
              <Filters />
            </Suspense>
          </div>

          {/* Keyboards */}
          <div className="flex-1">
            <MobileControls />
            
            {hasKeyboards ? (
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
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="w-24 h-24 text-gray-300 mb-6" strokeWidth={1.5} />
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">No items found</h2>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}