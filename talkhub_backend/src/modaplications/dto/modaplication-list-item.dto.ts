import { ApiProperty } from '@nestjs/swagger';

export class ModAplicationListItemUserDto {
  /**
   * The user's id
   */
  @ApiProperty({
    description: "The user's id",
    example: 1,
  })
  id: number;
  /**
   * The user's name
   */
  @ApiProperty({
    description: "The user's username",
    example: 'name',
  })
  name: string;
}

export class ModAplicationListItemDto {
  /**
   * The modaplication's id
   */
  @ApiProperty({
    description: "The modaplication's id",
    example: 1,
  })
  id_modaplication: number;

  /**
   * The aplicant
   */
  @ApiProperty({
    description: 'The aplicant',
    example: 1,
    type: ModAplicationListItemUserDto,
  })
  user: ModAplicationListItemUserDto;

  /**
   * The modaplication's date
   */
  @ApiProperty({
    description: "The modaplication's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The aplication's reason
   */
  @ApiProperty({
    description: "The aplication's reason",
    example: 'Aplication Reason',
  })
  reason: string;
}
