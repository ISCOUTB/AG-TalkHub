import { ApiProperty } from '@nestjs/swagger';

/**
 * The result of a comment creation
 */
export class CommentCreatedResultDto {
  /**
   * The comment's id
   */
  @ApiProperty({
    description: "The comment's id",
    example: 1,
  })
  id_comment: number;
}
