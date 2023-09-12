import { PrimaryColor } from '@/app/api/blogs/value-objects/primary-color'
import { Injectable } from '@nestjs/common'
import {
  AiBlogPrimaryColorGeneratorAdapter,
  GenerateParams,
} from '../ai-blog-primary-color-generator.adapter'

@Injectable()
export class FakeAiBlogPrimaryColorGeneratorService
  implements AiBlogPrimaryColorGeneratorAdapter
{
  async generate(params: GenerateParams): Promise<PrimaryColor> {
    return new PrimaryColor('BLUE', true)
  }
}
