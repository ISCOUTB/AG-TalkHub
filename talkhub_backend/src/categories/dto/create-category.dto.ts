import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a category
 * using class-validator
 */
export class CreateCategoryDto {
  /**
   * The category's name
   */
  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: "The category's name",
    example: 'Category Name',
  })
  name: string;

  /**
   * The category's description
   */
  @IsString()
  @MaxLength(250)
  @ApiProperty({
    description: "The category's description",
    example: 'Category Description',
  })
  description: string;
}
