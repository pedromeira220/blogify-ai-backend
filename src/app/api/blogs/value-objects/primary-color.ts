import { BadRequestException } from '@nestjs/common'

export const primaryColorArray = [
  'PURPLE',
  'ORANGE',
  'BLUE',
  'GREEN',
  'YELLOW',
] as const
export type PrimaryColorType = (typeof primaryColorArray)[number]

export class PrimaryColor {
  private _value: PrimaryColorType
  private _generateByAi: boolean

  get value() {
    return this._value
  }

  get generateByAi() {
    return this._generateByAi
  }

  constructor(value: PrimaryColorType, generateByAi: boolean) {
    if (!primaryColorArray.includes(value)) {
      throw new BadRequestException(
        `Primary color precisa ser uma dessas opções: ${primaryColorArray}`,
      )
    }

    this._value = value
    this._generateByAi = generateByAi
  }
}
