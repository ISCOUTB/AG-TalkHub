import { ApiProperty } from '@nestjs/swagger';

export class ModAplicationDto {
  /**
   * The modaplication's id
   */
  @ApiProperty({
    description: "The modaplication's id",
    example: 1,
  })
  id_modaplication: number;

  /**
   * The aplicant's id
   */
  @ApiProperty({
    description: "The aplicant's id",
    example: 1,
  })
  id_user: number;

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
