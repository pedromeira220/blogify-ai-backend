import { Entity } from '@/app/common/entities/entity.entity'
import { Optional } from '@/app/common/logic/optional'
import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'
import { Slug } from '../../../common/value-objects/slug'
import { PublicationContent } from '../value-objects/publication-content'

export interface PublicationProps {
  title: string
  subtitle: string
  slug: Slug
  blogId: UniqueEntityId
  creationDate: Date
  content: PublicationContent
  thumbnailId: UniqueEntityId
}

export class Publication extends Entity<PublicationProps> {
  get title() {
    return this.props.title
  }

  set title(value: string) {
    this.props.title = value
  }

  get subtitle() {
    return this.props.subtitle
  }

  set subtitle(value: string) {
    this.props.subtitle = value
  }

  get slug() {
    return this.props.slug
  }

  set slug(value: Slug) {
    this.props.slug = value
  }

  get blogId() {
    return this.props.blogId
  }

  get creationDate() {
    return this.props.creationDate
  }

  get content() {
    return this.props.content
  }

  set content(value: PublicationContent) {
    this.props.content = value
  }

  get thumbnailId() {
    return this.props.thumbnailId
  }

  static create(
    props: Optional<PublicationProps, 'creationDate' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const publication = new Publication(
      {
        ...props,
        creationDate: props.creationDate ? props.creationDate : new Date(),
        slug: props.slug ?? Slug.createFromText(props.title),
      },
      id,
    )

    return publication
  }
}
