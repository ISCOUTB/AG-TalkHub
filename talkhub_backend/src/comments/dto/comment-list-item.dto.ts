import { ApiProperty } from '@nestjs/swagger';

/**
 * This class is a data transfer object for a comment's user
 */
export class CommentListItemUserDto {
  /**
   * The user's id
   */
  @ApiProperty({
    description: "The user's id",
    example: 1,
  })
  id_user: number;

  /**
   * The user's name
   */
  @ApiProperty({
    description: "The user's name",
    example: 'User Name',
  })
  name: string;
}

/**
 * This class is a data transfer object for a comment
 */
export class CommentListItemDto {
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
   * The comment's user
   */
  @ApiProperty({
    description: "The comment's user",
    example: {
      id_user: 1,
      name: 'name',
    },
    type: CommentListItemUserDto,
  })
  user: CommentListItemUserDto;

  /**
   * The comment's thread
   */
  @ApiProperty({
    description: "The comment's thread",
    example: {
      id_thread: 1,
      title: 'Thread Title',
    },
  })
  thread: {
    id_thread: number;
    title: string;
  };
}
