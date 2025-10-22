import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductGroupList } from "@/components/shared/products-group-list";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const layouts = await prisma.layout.findMany({
    where: {
      keyboards: {
        some: {}, // Only get layouts with keyboards
      },
    },
    include: {
      keyboards: {
        include: {
          switches: true,
          colorVariants: true,
        },
      },
    },
  });

  const topBarLayouts = layouts
    .map((l) => ({ id: l.id, name: l.name }));

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
            <Filters />
          </div>

          {/* Keyboards */}
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {layouts.map(
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
