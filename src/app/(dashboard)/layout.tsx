import DesktopSidebar from '@/components/Sidebar'
import { Separator } from '@/components/ui/separator'

export default function DashboardLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen'>
      <DesktopSidebar />
      <div className='flex min-h-screen flex-1 flex-col'>
        <header className='container flex h-[50px] items-center justify-between px-6 py-4'>
          ScrapeFlow
        </header>
        <Separator />
        {/* Use the overflow-auto utility to add scrollbars to an element in the event that its content overflows the bounds of that element. */}
        <div className='overflow-auto'>
          <div className='container flex-1 py-4 text-accent-foreground'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
