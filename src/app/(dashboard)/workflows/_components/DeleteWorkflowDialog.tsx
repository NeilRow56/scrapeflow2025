'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import { useMutation } from '@tanstack/react-query'
import { deleteWorkflow } from '@/actions/workflows/deleteworkflow'
import { toast } from 'sonner'

interface DeleteWorkflowDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  workflowName: string
  workflowId: string
}

export default function DeleteWorkflowDialog({
  open,
  setOpen,
  workflowName,
  workflowId
}: DeleteWorkflowDialogProps) {
  const [confirmText, setConfirmText] = useState('')

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deleted successfully', { id: workflowId })
      setConfirmText('')
    },
    onError: () => {
      toast.error('Something went wrong!', { id: workflowId })
    }
  })
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger></AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            workflow , you will not be able to recover it.
            <Input
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
            />
          </AlertDialogDescription>
          <AlertDialogDescription>
            If you are sure, enter <b>{workflowName}</b> to confirm
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setConfirmText('')}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-destructive text-destructive-foreground hover:bg-destructive/80'
            disabled={confirmText !== workflowName || deleteMutation.isPending}
            onClick={e => {
              toast.loading('Deleting workflow...', { id: workflowId })
              deleteMutation.mutate(workflowId)
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
