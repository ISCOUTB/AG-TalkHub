import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a thread
 * using class-validator
 */
export class UpdateThreadDto {
  /**
   * The thread's title
   */
  @IsString()
  @IsOptional()
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
  @IsOptional()
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
  @IsOptional()
  @ApiProperty({
    description: "The thread's publication date",
    example: '2024-01-01',
  })
  publication_date: string;

  /**
   * The thread's category
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "The thread's category",
    example: 1,
  })
  id_category: number;
}
