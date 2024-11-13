import { ApiProperty } from '@nestjs/swagger';

export class BanDto {
  /**
   * The ban's id
   */
  @ApiProperty({
    description: "The ban's id",
    example: 1,
  })
  id_ban: number;

  /**
   * The ban's reason
   */
  @ApiProperty({
    description: "The ban's reason",
    example: 'Ban Reason',
  })
  reason: string;

  /**
   * The ban's date
   */
  @ApiProperty({
    description: "The ban's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The banned user
   */
  @ApiProperty({
    description: 'The banned user',
    example: 1,
  })
  id_user: number;
}
