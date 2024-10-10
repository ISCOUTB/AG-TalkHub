import { ApiProperty } from '@nestjs/swagger';

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
   * The thread's publication date
   */
  @ApiProperty({
    description: "The thread's publication date",
    example: '2024-01-01',
  })
  id_user: number;

  /**
   * The thread's category
   */
  @ApiProperty({
    description: "The thread's category",
    example: 1,
  })
  id_category: number;
}
