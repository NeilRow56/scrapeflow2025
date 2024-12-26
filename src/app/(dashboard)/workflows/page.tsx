import { getWorkflowsForUser } from '@/actions/workflows/getWorkflowsForUser'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

import React, { Suspense } from 'react'
import { AlertCircle } from 'lucide-react'
import { EmptyState } from '@/components/EmptyState'
import { Metadata } from 'next'
import CreateWorkflowDialog from './_components/CreateWorkflowDialog'

export const metadata: Metadata = {
  title: 'Design your workflows'
}

export default function WorkflowsPage() {
  return (
    <div className='flex h-full flex-1 flex-col'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <h1 className='text-3xl font-bold'>Workflows</h1>
          <p className='text-muted-foreground'>Manage your worflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>
      <div className='h-full py-6'>
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  )
}

function UserWorkflowsSkeleton() {
  return (
    <div className='space-y-2'>
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} className='h-32 w-full' />
      ))}
    </div>
  )
}

async function UserWorkflows() {
  const workflows = await getWorkflowsForUser()

  if (!workflows) {
    return (
      <Alert variant={'destructive'}>
        <AlertCircle className='h-4 w-4' />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    )
  }
  if (workflows.length === 0) {
    return (
      <div className='flex flex-col items-center space-y-5'>
        <EmptyState
          title='You do not have any Workflows created'
          description='You currently do not have any Workflows. Please create some so that you can
see them right here!'
        />
        <CreateWorkflowDialog triggerText='Create yout first workflow' />
      </div>
    )
  }

  return <div></div>
}
