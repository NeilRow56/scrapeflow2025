export default function WorkflowLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className='flex h-screen bg-green-50'>
      {/* Use the overflow-auto utility to add scrollbars to an element in the event that its content overflows the bounds of that element. */}
      <div className='overflow-auto'>
        <div className='container flex-1 py-4 text-accent-foreground'>
          {children}
        </div>
      </div>
    </div>
  )
}
