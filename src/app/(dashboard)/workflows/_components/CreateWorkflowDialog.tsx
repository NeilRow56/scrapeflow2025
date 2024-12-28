'use client'

import React, { useCallback, useState } from 'react'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Layers2Icon, Loader2 } from 'lucide-react'
import CustomDialogHeader from '@/components/CustomDialogHeader'
import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  createWorkflowSchema,
  createWorkflowSchemaType
} from '@/schemas/workflows'

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
import { useMutation } from '@tanstack/react-query'
import { createWorkflow } from '@/actions/workflows/createWorkflows'
import { toast } from 'sonner'

export default function CreateWorkflowDialog({
  triggerText
}: {
  triggerText?: string
}) {
  const [open, setOpen] = useState(false)

  const form = useForm<createWorkflowSchemaType>({
    resolver: zodResolver(createWorkflowSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkflow
    // onSuccess: () => {
    //   toast.error('Workflow created successfully', {
    //     id: 'create-workflow'
    //   })
    // }
    // onError: () => {
    //   toast.error('Workflow not created - name already be un use  ', {
    //     id: 'create-workflow'
    //   })
    // }
  })

  const onSubmit = useCallback(
    (values: createWorkflowSchemaType) => {
      mutate(values)
    },
    [mutate]
  )

  return (
    <Dialog
      open={open}
      onOpenChange={open => {
        form.reset()
        setOpen(open)
      }}
    >
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
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-8'
            >
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
              <Button disabled={isPending} type='submit' className='w-full'>
                {!isPending && 'Proceed'}
                {isPending && <Loader2 className='animate-spin' />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
