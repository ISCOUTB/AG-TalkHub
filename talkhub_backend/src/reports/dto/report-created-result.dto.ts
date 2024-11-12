import { ApiProperty } from '@nestjs/swagger';

export class ReportCreatedResultDto {
  /**
   * The report's id
   */
  @ApiProperty({
    description: "The report's id",
    example: 1,
  })
  id_report: number;
}
