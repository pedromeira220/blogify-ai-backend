import {
  Publication,
  PublicationProps,
} from '@/app/api/publications/entities/publication.entity'
import { PublicationContent } from '@/app/api/publications/value-objects/publication-content'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { faker } from '@faker-js/faker'

export function makePublication(
  override: Partial<PublicationProps> = {},
  id?: UniqueEntityId,
) {
  const publication = Publication.create(
    {
      blogId: new UniqueEntityId(),
      content: PublicationContent.create(faker.lorem.paragraphs()),
      subtitle: faker.lorem.text(),
      title: faker.lorem.slug(),
      ...override,
    },
    id,
  )

  return publication
}
