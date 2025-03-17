import { Container, Filters, Title, TopBar } from "@/components/shared";


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
        List of keyboards
        </div>
      </div>

      
      </div>
    </Container>
  </>;
}
