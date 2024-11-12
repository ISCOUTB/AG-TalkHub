import { ApiProperty } from '@nestjs/swagger';

export class ReportDto {
  /**
   * The report's id
   */
  @ApiProperty({
    description: "The report's id",
    example: 1,
  })
  id_report: number;

  /**
   * The report's reason
   */
  @ApiProperty({
    description: "The report's reason",
    example: 'Report Reason',
  })
  reason: string;

  /**
   * The report's date
   */
  @ApiProperty({
    description: "The report's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The report's user
   */
  @ApiProperty({
    description: "The report's user",
    example: 1,
  })
  id_user: number;

  /**
   * The report's comment
   */
  @ApiProperty({
    description: "The report's comment",
    example: 1,
  })
  id_comment: number;
}
