import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import DesktopSidebar from '@/components/Sidebar'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SignedIn, UserButton } from '@clerk/nextjs'

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
          <BreadcrumbHeader />
          <div className='flex items-center gap-3'>
            <ThemeModeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
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
