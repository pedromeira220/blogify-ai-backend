import {
  PrimaryColor,
  PrimaryColorType,
  primaryColorArray,
} from '@/app/api/blogs/value-objects/primary-color'
import { Injectable } from '@nestjs/common'
import {
  AiBlogPrimaryColorGeneratorAdapter,
  GenerateParams,
} from '../ai-blog-primary-color-generator.adapter'
import { AiPrompterAdapter } from '../ai-prompter.adapter'

@Injectable()
export class VercelAiSdkAiBlogPrimaryColorGeneratorService
  implements AiBlogPrimaryColorGeneratorAdapter
{
  constructor(private readonly aiPrompter: AiPrompterAdapter) {}

  async generate(params: GenerateParams): Promise<PrimaryColor> {
    const prompt = `Você vai agir como um especialista em design de websites. Você precisa escolher a cor primária de um blog, ela só pode ser uma dessas opções:
    Opções: ${primaryColorArray.toString()}
    Considerando as informações que passar a seguir, quero que me retorne APENAS a cor primária que mais se encaixa nos requisitos, nenhum texto a mais:
    Tema: ${params.theme}
    Descrição: ${params.description}
    Nome do blog: ${params.name}
    `

    const { completion } = await this.aiPrompter.prompt({
      prompt,
      temperature: 0.8,
    })

    console.log('> completion do generate primary color', completion)

    if (!primaryColorArray.includes(completion as PrimaryColorType)) {
      console.error(
        `O chat gpt gerou o seguinte cor: ${completion}, mas não está inclusa nas opções `,
      )

      // FIXME: tratar este erro

      return new PrimaryColor('BLUE', true)
    }

    return new PrimaryColor(completion as PrimaryColorType, true)
  }
}
