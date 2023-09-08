import { Entity } from 'src/app/common/entities/entity.entity'
import { Optional } from 'src/app/common/logic/optional'
import { UniqueEntityId } from 'src/app/common/value-objects/unique-entity-id'
import { PrimaryColor } from '../value-objects/primary-color'

export interface BlogProps {
  theme: string
  description: string
  name: string
  slug: string
  primaryColor: PrimaryColor
  creationDate: Date
}

export class Blog extends Entity<BlogProps> {
  get theme() {
    return this.props.theme
  }

  set theme(value: string) {
    this.props.theme = value
  }

  get description() {
    return this.props.description
  }

  set description(value: string) {
    this.props.description = value
  }

  get name() {
    return this.props.name
  }

  set name(value: string) {
    this.props.name = value
  }

  get slug() {
    return this.props.slug
  }

  set slug(value: string) {
    this.props.slug = value
  }

  get primaryColor() {
    return this.props.primaryColor
  }

  set primaryColor(value: PrimaryColor) {
    this.props.primaryColor = value
  }

  get creationDate() {
    return this.props.creationDate
  }

  static create(
    props: Optional<BlogProps, 'creationDate'>,
    id?: UniqueEntityId,
  ) {
    const blog = new Blog(
      {
        ...props,
        creationDate: props.creationDate ? props.creationDate : new Date(),
      },
      id,
    )

    return blog
  }
}
