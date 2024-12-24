import BreadcrumbHeader from '@/components/BreadcrumbHeader'
import Logo from '@/components/Logo'
import DesktopSidebar from '@/components/Sidebar'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { Breadcrumb } from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-3'>
      <Logo />
      {children}
    </div>
  )
}
