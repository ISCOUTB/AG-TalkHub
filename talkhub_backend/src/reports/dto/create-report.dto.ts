import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
  /**
   * The report's reason
   */
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: "The report's reason",
    example: 'Report Reason',
  })
  reason: string;

  /**
   * The report's date
   */
  @IsString()
  @ApiProperty({
    description: "The report's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The report's user
   */
  @IsNumber()
  @ApiProperty({
    description: "The report's user",
    example: 1,
  })
  id_user: number;

  /**
   * The report's comment
   */
  @IsNumber()
  @ApiProperty({
    description: "The report's comment",
    example: 1,
  })
  id_comment: number;
}
