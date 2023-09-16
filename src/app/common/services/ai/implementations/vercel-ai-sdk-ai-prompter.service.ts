import { EnvService } from '@/app/core/env/env.service'
import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'
import {
  AiPrompterAdapter,
  PromptRequestParams,
  PromptResponse,
} from '../ai-prompter.adapter'

@Injectable()
export class VercelAiSdkAiPrompterService implements AiPrompterAdapter {
  private openAi: OpenAI

  constructor(private readonly envService: EnvService) {
    this.openAi = new OpenAI({
      apiKey: this.envService.get('OPENAI_API_KEY'),
    })
  }

  async prompt(params: PromptRequestParams): Promise<PromptResponse> {
    const response = await this.openAi.chat.completions.create({
      model: 'gpt-3.5-turbo',
      stream: false,
      messages: [
        {
          role: 'user',
          content: params.prompt,
        },
      ],
      temperature: params.temperature,
    })

    const completion = response.choices[0].message.content

    return {
      completion: completion ?? '',
    }
  }
}
