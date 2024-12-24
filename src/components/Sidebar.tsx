'use client'

import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react'
import React from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'

const routes = [
  { href: '/', label: 'Home', icon: HomeIcon },
  { href: 'workflows', label: 'Workflows', icon: Layers2Icon },
  { href: 'credentials', label: 'Credentials', icon: ShieldCheckIcon },
  { href: 'billing', label: 'Billing', icon: CoinsIcon }
]

export default function DesktopSidebar() {
  const pathname = usePathname()
  const activeRoute =
    routes.find(
      route => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0]
  // Use the overflow-hidden utility to clip any content within an element that overflows the bounds of that element.
  return (
    <div className='relative hidden h-screen min-w-[280px] max-w-[280px] border-separate overflow-hidden border-r-2 bg-primary/5 text-muted-foreground dark:bg-secondary/30 dark:text-foreground md:block'>
      <div className='flex border-separate items-center justify-center gap-2 border-b-[1px] p-4'>
        <Logo />
      </div>
      <div className='text-center'>TODO CREDITS</div>
      <div className='flex flex-col p-2'>
        {routes.map(route => (
          <Link
            key={route.href}
            href={route.href}
            className={buttonVariants({
              variant:
                activeRoute.href === route.href
                  ? 'sidebarActiveItem'
                  : 'sidebarItem'
            })}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
