import db from '@/lib/db'
import { waitFor } from '@/lib/helper/waitFor'
import { auth } from '@clerk/nextjs/server'
import React from 'react'
import Editor from '../../_components/Editor'

export default async function WorkflowEditorPage({
  params
}: {
  params: { workflowId: string }
}) {
  const { workflowId } = await params

  const { userId } = await auth()
  if (!userId) return <div>Unauthenticated</div>

  //   await waitFor(5000)

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId: userId
    }
  })
  if (!workflow) {
    return <div>Workflow not found</div>
  }
  return <Editor workflow={workflow} />
}
