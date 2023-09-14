import { Global, Module } from '@nestjs/common'
import { AiPrompterAdapter } from '../services/ai/ai-prompter.adapter'
import { VercelAiSdkAiPrompterService } from '../services/ai/implementations/vercel-ai-sdk-ai-prompter.service'

@Global()
@Module({
  providers: [
    {
      provide: AiPrompterAdapter,
      useClass: VercelAiSdkAiPrompterService,
    },
  ],
  exports: [AiPrompterAdapter],
})
export class AiModule {}
