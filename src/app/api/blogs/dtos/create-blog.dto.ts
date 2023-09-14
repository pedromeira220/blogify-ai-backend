import { IsEnum, IsString, MaxLength } from 'class-validator'

export enum PrimaryColorEnumFromDTO {
  'PURPLE' = 'PURPLE',
  'ORANGE' = 'ORANGE',
  'BLUE' = 'BLUE',
  'GREEN' = 'GREEN',
  'YELLOW' = 'YELLOW',
  'ASK_AI' = 'ASK_AI',
}

export class CreateBlogDTO {
  @IsString()
  @MaxLength(40)
  theme: string

  @IsString()
  @MaxLength(256)
  description: string

  @IsString()
  @MaxLength(40)
  name: string

  @IsString()
  @MaxLength(40)
  slug: string

  @IsString()
  @IsEnum(PrimaryColorEnumFromDTO)
  primaryColor: keyof typeof PrimaryColorEnumFromDTO
}
