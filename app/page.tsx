import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductCard } from "@/components/shared/product-card";
import { ProductGroupList } from "@/components/shared/products-group-list";


export default function Home() {
  return <>
    <Container className="mt-5">
      <Title text='All Keyboards' size='lg' className="font-extrabold" />
    </Container>

    <TopBar />

    <Container className="mt-9 pb-14">
      <div className="flex gap-[60px]">

        {/* Filters */}
        <div>
          <Filters />
        </div>

        {/* Keyboards */}
        <div className="flex-1">
          <div className="flex flex-col gap-16">

            <ProductGroupList title="80% Layout" items={[
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 2,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 3,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 4,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 5,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
            ]} categoryId={2} />
            <ProductGroupList title="75% Layout" items={[
              {
                id: 6,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 7,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 8,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 9,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 10,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
            ]} categoryId={3} />
            <ProductGroupList title="65% Layout" items={[
              {
                id: 11,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 12,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 13,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 14,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
              {
                id: 15,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/K87SBlackPink.jpg?v=1759915238&width=1000",
                colors: ["black", "white", "purple", "blue"]
              },
            ]} categoryId={4} />

          </div>
        </div>


      </div>
    </Container>
  </>;
}
