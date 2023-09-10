interface Src {
  original: string
  small: string
}

interface ImageSearcherResponseProps {
  src: Src
}

export class ImageSearcherResponse implements ImageSearcherResponseProps {
  private _src: Src

  get src() {
    return this._src
  }

  constructor(props: ImageSearcherResponseProps) {
    this._src = props.src
  }
}
