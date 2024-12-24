'use client'

import {
  CoinsIcon,
  HomeIcon,
  Layers2Icon,
  MenuIcon,
  ShieldCheckIcon
} from 'lucide-react'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import React, { useState } from 'react'
import Logo from './Logo'
import Link from 'next/link'
import { Button, buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from './ui/sheet'

const routes = [
  { href: '', label: 'Home', icon: HomeIcon },
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

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false)
  const pathname = usePathname()
  const activeRoute =
    routes.find(
      route => route.href.length > 0 && pathname.includes(route.href)
    ) || routes[0]
  return (
    <div className='block border-separate bg-background md:hidden'>
      <nav className='container flex items-center justify-between px-8'>
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className='w-[400px] space-y-4 sm:w-[540px]'
            side='left'
          >
            {/* Visually hidden is needed if we do not want to show the title */}
            <VisuallyHidden.Root>
              <SheetTitle>Menu</SheetTitle>
            </VisuallyHidden.Root>

            <Logo />
            <div className='flex flex-col gap-1'>
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
                  onClick={() => setOpen(prev => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}
