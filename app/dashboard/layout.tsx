import Navbar from "@/components/ui/navbar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#151718] text-[#11181c] dark:text-[#ecedee]">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 dark:bg-gradient-to-b from-[#151718] via-[#1a1d1e] to-[#151718]" />
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-brand-accent/8 rounded-full blur-[100px]" />
      </div>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        {children}
      </div>
    </div>
  )
}
