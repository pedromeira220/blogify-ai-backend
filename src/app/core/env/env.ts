import { z } from 'zod'

export const envSchema = z.object({
  UNSPLASH_CLIENT_ID: z.string(),
  OPENAI_API_KEY: z.string(),

  DATABASE_URL: z.string().url(),

  NODE_ENV: z.enum(['development', 'production', 'test', 'provision']),
  PORT: z.coerce.number().default(3333),
})

export type Env = z.infer<typeof envSchema>
