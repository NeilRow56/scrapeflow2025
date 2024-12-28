import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'
import React from 'react'

export default async function WorkflowEditorPage({
  params
}: {
  params: { workflowId: string }
}) {
  const { workflowId } = await params

  const { userId } = await auth()
  if (!userId) return <div>Unauthenticated</div>

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId: userId
    }
  })
  if (!workflow) {
    return <div>Workflow not found</div>
  }
  return <pre>{JSON.stringify(workflow, null, 4)}</pre>
}
