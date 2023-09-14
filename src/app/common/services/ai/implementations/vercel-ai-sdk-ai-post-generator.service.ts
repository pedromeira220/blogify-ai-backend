import { Blog } from '@/app/api/blogs/entities/blog.entity'
import { Publication } from '@/app/api/publications/entities/publication.entity'
import { PostFromAi } from '@/app/api/publications/value-objects/post-from-ai'
import { AiPostGeneratorResponse } from '@/app/common/interfaces/ai-post-generator-response.interface'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Injectable } from '@nestjs/common'
import { AiPostGeneratorAdapter } from '../ai-post-generator.adapter'
import { AiPrompterAdapter } from '../ai-prompter.adapter'

@Injectable()
export class VercelAiSdkAiPostGeneratorService
  implements AiPostGeneratorAdapter
{
  constructor(private readonly aiPrompter: AiPrompterAdapter) {}

  async generate(
    blog: Blog,
    alreadyGeneratedPublications: Publication[],
  ): Promise<PostFromAi> {
    const prompt = `
      Você será um redator de blogs profissional e quero que crie um artigo para este blog.
      Para cada artigo quero que aborde um tema diferente, então toda vez que for gerar um post, use um tema diferente.

      ${
        alreadyGeneratedPublications.length > 0
          ? 'Aqui vai uma lista das publicações já geradas:'
          : ''
      }

      ${
        alreadyGeneratedPublications.length > 0
          ? alreadyGeneratedPublications
              .map((publication) => publication.title)
              .toString()
          : ''
      }
      
      Segue abaixo algumas informações sobre o blog:
      Tema: ${blog.theme}
      Descrição: ${blog.description}
      Nome: ${blog.name}
      Quero que o conteúdo do blog seja em formato markdown.
      Além disso, quero que retorne uma thumbnail, ela será buscada pela api do Unsplash, então me de um bom termo de busca em ingles para buscar a imagem.
      Note: Você será meu backend, ou seja, quero que a resposta seja APENAS no formato JSON com a seguinte estrutura, não mande nada mais do que o JSON na sua resposta (nem mesmo uma mensagem antes ou depois do JSON):
      {
        “title”: “Aqui vai o título do artigo”,
        “subtitle”: “aqui vai o subtítulo”,
        “content”: “aqui vai o conteúdo em markdown”,
        “thumbnailSearchTerm”: “aqui vai o search term”
      }
    `

    const { completion } = await this.aiPrompter.prompt({
      prompt,
    })

    console.log('> completion', completion)

    // TODO: adicionar a validação que o json realmente possui os campos
    const completionAsJson = JSON.parse(completion) as AiPostGeneratorResponse

    console.log('> completionAsJson', completionAsJson)

    return new PostFromAi({
      content: completionAsJson.content,
      subtitle: completionAsJson.subtitle,
      thumbnailSearchTerm: completionAsJson.thumbnailSearchTerm,
      title: completionAsJson.title,
      id: new UniqueEntityId(),
    })
  }
}
