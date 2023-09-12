import { PrimaryColor } from '@/app/api/blogs/value-objects/primary-color'

export interface GenerateParams {
  theme: string
  description: string
  name: string
}

export abstract class AiBlogPrimaryColorGeneratorAdapter {
  abstract generate(params: GenerateParams): Promise<PrimaryColor>
}
