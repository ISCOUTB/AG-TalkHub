import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBanDto {
  /**
   * The ban's reason
   */
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: "The ban's reason",
    example: 'Ban Reason',
  })
  reason: string;

  /**
   * The ban's date
   */
  @IsString()
  @ApiProperty({
    description: "The ban's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The banned user
   */
  @IsNumber()
  @ApiProperty({
    description: 'The banned user',
    example: 1,
  })
  id_user: number;
}
