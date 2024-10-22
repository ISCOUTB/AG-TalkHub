import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * This class is a data transfer object for updating a comment
 * using class-validator
 */
export class UpdateCommentDto {
  /**
   * The comment's content
   */
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  @ApiProperty({
    description: "The comment's content",
    example: 'Comment Content',
  })
  content: string;

  /**
   * The comment's publication date
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The comment's publication date",
    example: '2024-01-01',
  })
  publication_date: string;

  /**
   * The comment's thread
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "The comment's thread",
    example: 1,
  })
  id_thread: number;

  /**
   * The comment's user
   */
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: "The comment's user",
    example: 1,
  })
  id_user: number;
}
