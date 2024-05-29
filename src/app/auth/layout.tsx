
export default function AuthLayout({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main className="flex justify-center min-h-screen">
      <div className="w-full sm:w-[350px] px-10">
        { children }
      </div>
    </main>
  )
}