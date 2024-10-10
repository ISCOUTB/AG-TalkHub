import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a thread
 * using class-validator
 */
export class CreateThreadDto {
  /**
   * The thread's title
   */
  @IsString()
  @MaxLength(100)
  @ApiProperty({
    description: "The thread's title",
    example: 'Thread Title',
  })
  title: string;

  /**
   * The thread's content
   */
  @IsString()
  @MaxLength(2000)
  @ApiProperty({
    description: "The thread's content",
    example: 'Thread Content',
  })
  content: string;

  /**
   * The thread's publication date
   */
  @IsString()
  @ApiProperty({
    description: "The thread's publication date",
    example: '2024-01-01',
  })
  publication_date: string;

  /**
   * The thread's category
   */
  @IsNumber()
  @ApiProperty({
    description: "The thread's category",
    example: 1,
  })
  id_category: number;

  /**
   * The thread's user
   */
  @IsNumber()
  @ApiProperty({
    description: "The thread's user",
    example: 1,
  })
  id_user: number;
}
