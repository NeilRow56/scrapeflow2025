'use server'

import db from '@/lib/db'

import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export async function deleteWorkflow(id: string) {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthenticated')
  }

  await db.workflow.delete({
    where: {
      id: id,
      userId: userId
    }
  })

  revalidatePath('/workflows')
}
