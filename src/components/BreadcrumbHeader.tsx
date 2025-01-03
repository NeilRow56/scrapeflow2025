'use client'

import { usePathname } from 'next/navigation'
import React from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import { MobileSidebar } from './Sidebar'

export default function BreadcrumbHeader() {
  const pathname = usePathname()
  const paths = pathname === '/' ? [''] : pathname?.split('/')
  return (
    <div className='flex-start flex items-center'>
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbList>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className='capitalize' href={`/${path}`}>
                  {path === '' ? 'home' : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}

          <BreadcrumbSeparator />
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}
