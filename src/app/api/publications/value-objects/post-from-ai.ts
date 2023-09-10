import { UniqueEntityId } from '@/app/common/value-objects/unique-entity-id'

interface PostFromAiProps {
  id: UniqueEntityId
  title: string
  subtitle: string
  content: string
  thumbnailSearchTerm: string
}

export class PostFromAi implements PostFromAiProps {
  private _id: UniqueEntityId
  private _title: string
  private _subtitle: string
  private _content: string
  private _thumbnailSearchTerm: string

  get id() {
    return this._id
  }

  get title() {
    return this._title
  }

  get subtitle() {
    return this._subtitle
  }

  get content() {
    return this._content
  }

  get thumbnailSearchTerm() {
    return this._thumbnailSearchTerm
  }

  constructor(props: PostFromAiProps) {
    this._id = props.id
    this._title = props.title
    this._subtitle = props.subtitle
    this._content = props.content
    this._thumbnailSearchTerm = props.thumbnailSearchTerm
  }
}
