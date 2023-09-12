export interface PromptRequestParams {
  prompt: string
  temperature?: number
}

export interface PromptResponse {
  completion: string
}

export abstract class AiPrompterAdapter {
  abstract prompt(params: PromptRequestParams): Promise<PromptResponse>
}
