import { ApiProperty } from '@nestjs/swagger';

/**
 * This class is a data transfer object for a comment
 */
export class CommentDto {
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
    example: 'Comment Content',
  })
  content: string;

  /**
   * The comment's publication date
   */
  @ApiProperty({
    description: "The comment's publication date",
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

  /**
   * The comment's user
   */
  @ApiProperty({
    description: "The comment's user",
    example: 1,
  })
  id_user: number;
}
