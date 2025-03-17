import { Container, Filters, Title, TopBar } from "@/components/shared";
import { ProductCart } from "@/components/shared/product-cart";
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
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
            ]} categoryId={1} />
            <ProductGroupList title="60% Layout" items={[
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
              {
                id: 1,
                name: "Mchoose g87",
                price: 66,
                items: [{ price: 66 }],
                imageUrl: "https://www.mchose.store/cdn/shop/files/Purple_48de50b0-62ff-41e6-aca9-8ddad6ee7636.jpg?v=1739527138&width=800"
              },
            ]} categoryId={2} />

          </div>
        </div>


      </div>
    </Container>
  </>;
}
