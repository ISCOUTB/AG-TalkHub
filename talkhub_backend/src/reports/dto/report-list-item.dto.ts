import { ApiProperty } from '@nestjs/swagger';

export class ReportListItemUserDto {
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

export class ReportListItemCommentDto {
  /**
   * The comment's id
   */
  @ApiProperty({
    description: "The comment's id",
    example: 1,
  })
  id_comment: number;
  /**
   * The comment's content
   */
  @ApiProperty({
    description: "The comment's content",
    example: 'content',
  })
  content: string;

  /**
   * The comment's date
   */
  @ApiProperty({
    description: "The comment's date",
    example: '2024-01-01',
  })
  publication_date: string;

  /**
   * The comment's thread
   */
  @ApiProperty({
    description: "The comment's thread",
    example: 1,
  })
  id_thread: number;
}
export class ReportListItemDto {
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
    type: ReportListItemUserDto,
  })
  user: ReportListItemUserDto;

  /**
   * The report's comment
   */
  @ApiProperty({
    description: "The report's comment",
    example: 1,
    type: ReportListItemCommentDto,
  })
  comment: ReportListItemCommentDto;
}
