import { Footer, SideBar, TopMenu } from "@/components";

export default function ShopLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <SideBar />
      <div className="p-2 md:p-10">
        { children }
      </div>
      <Footer />
    </main>
  )
}


//bg-red-500