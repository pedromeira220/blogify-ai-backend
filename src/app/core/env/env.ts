import { z } from 'zod'

export const envSchema = z.object({
  UNSPLASH_CLIENT_ID: z.string(),
})

export type Env = z.infer<typeof envSchema>
