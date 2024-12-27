'use server'

import db from '@/lib/db'
import {
  createWorkflowSchema,
  createWorkflowSchemaType
} from '@/schemas/workflows'
import { WorkflowStatus } from '@/types/workflow'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export async function createWorkflow(form: createWorkflowSchemaType) {
  const { success, data } = createWorkflowSchema.safeParse(form)

  if (!success) {
    throw new Error('Invalid form data')
  }
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthenticated')
  }

  const result = await db.workflow.create({
    data: {
      userId: userId,
      status: WorkflowStatus.DRAFT,
      definition: 'TODO',
      ...data
    }
  })

  if (!result) {
    throw new Error('Failed to create workflow')
  }

  redirect(`/workflow/editor/${result.id}`)
}
