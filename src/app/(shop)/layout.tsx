import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <>
    <main>
      <TopMenu />
      <SideBar />
      <div className="p-2 md:p-10">
        { children }
      </div>
    </main>
    <Footer />
    </>
  )
}


//bg-red-500