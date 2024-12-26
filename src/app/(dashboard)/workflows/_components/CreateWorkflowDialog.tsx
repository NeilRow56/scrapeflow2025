'use client'

import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Layers2Icon } from 'lucide-react'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { createWorkflowSchema } from '@/schemas/workflows'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

export default function CreateWorkflowDialog({
  triggerText
}: {
  triggerText?: string
}) {
  const [open, setOpen] = useState(false)

  const form = useForm<z.infer<typeof createWorkflowSchema>>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{triggerText ?? 'Create workflow'}</Button>
      </DialogTrigger>
      <DialogContent className='px-0'>
        <CustomDialogHeader
          icon={Layers2Icon}
          title='Create workflow'
          subTitle='Start building your workflow'
        />
        <div className='p-6'>
          <Form {...form}>
            <form className='w-full space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      Name
                      <p className='text-xs text-primary'>(required)</p>
                    </FormLabel>

                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Please choose a descriptive and unique name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className='flex items-center gap-1'>
                      Description
                      <p className='text-xs text-muted-foreground'>
                        (optional)
                      </p>
                    </FormLabel>

                    <FormControl>
                      <Textarea {...field} className='resize-none' />
                    </FormControl>
                    <FormDescription>
                      Please provide a brief description of what your workflow
                      does.
                      <br /> This is optional but can help you rememeber the
                      workflow&apos;s purpose.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='w-full'>
                Proceed
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
