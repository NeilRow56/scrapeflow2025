'use server'

import db from '@/lib/db'
import { auth } from '@clerk/nextjs/server'

export async function getWorkflowsForUser() {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthenticated')
  }

  return db.workflow.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'asc'
    }
  })
}
