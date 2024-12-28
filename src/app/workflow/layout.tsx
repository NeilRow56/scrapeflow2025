import Logo from '@/components/Logo'
import { ThemeModeToggle } from '@/components/ThemeModeToggle'
import { Separator } from '@/components/ui/separator'

export default function WorkflowLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen w-full flex-col'>
      {/* Use the overflow-auto utility to add scrollbars to an element in the event that its content overflows the bounds of that element. */}

      {children}
      <Separator />
      <footer className='items center flex justify-between p-2'>
        <Logo iconSize={16} fontSize='text-xl' />
        <ThemeModeToggle />
      </footer>
    </div>
  )
}
