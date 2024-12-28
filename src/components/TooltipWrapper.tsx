'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

interface TooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export default function TooltipWrapper(props: TooltipProps) {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side}>
          <p>{props.content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
