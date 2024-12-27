import { z } from 'zod'

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .min(4, {
      message: 'Workflow name must be at least 4 characters'
    })
    .max(30),
  description: z.string().max(80).optional()
})

export type createWorkflowSchemaType = z.infer<typeof createWorkflowSchema>
