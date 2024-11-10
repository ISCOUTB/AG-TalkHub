import { ApiProperty } from '@nestjs/swagger';

export class ThreadUserDto {
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
    description: "The user's name",
    example: 'User Name',
  })
  name: string;

  /**
   * The user's role
   */
  @ApiProperty({
    description: "The user's role",
    example: 'regular',
    enum: ['admin', 'regular', 'moderator'],
  })
  role: string;
}
/**
 * This class is a data transfer object for a thread
 */
export class ThreadDto {
  /**
   * The thread's id
   */
  @ApiProperty({
    description: "The thread's id",
    example: 1,
  })
  id_thread: number;

  /**
   * The thread's title
   */
  @ApiProperty({
    description: "The thread's title",
    example: 'Thread Title',
  })
  title: string;

  /**
   * The thread's content
   */
  @ApiProperty({
    description: "The thread's content",
    example: 'Thread Content',
  })
  content: string;

  /**
   * The thread's user
   */
  @ApiProperty({
    description: "The thread's user",
    example: {
      id_user: 1,
      name: 'name',
    },
    type: ThreadUserDto,
  })
  user: ThreadUserDto;

  /**
   * The thread's category
   */
  @ApiProperty({
    description: "The thread's category",
    example: 1,
  })
  id_category: number;

  /**
   * The thread's publication date
   */
  @ApiProperty({
    description: "The thread's publication date",
    example: '2024-01-01',
  })
  publication_date: string;
}
