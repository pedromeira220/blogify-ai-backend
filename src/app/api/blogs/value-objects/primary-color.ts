const primaryColor = ['PURPLE', 'ORANGE', 'BLUE', 'GREEN', 'YELLOW'] as const
type PrimaryColorType = (typeof primaryColor)[number]

export class PrimaryColor {
  private _value: PrimaryColorType
  private generateByAi: boolean

  constructor(value: PrimaryColorType, generateByAi: boolean) {
    if (!primaryColor.includes(value)) {
      throw new Error(
        `Primary color precisa ser uma dessas opções: ${primaryColor}`,
      ) // TODO: colocar depois um erro usando as exceptions do Nest
    }

    this._value = value
    this.generateByAi = generateByAi
  }
}
