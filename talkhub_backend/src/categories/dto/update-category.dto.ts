import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a category
 * using class-validator
 */
export class UpdateCategoryDto {
  /**
   * The category's name
   */
  @IsString()
  @IsOptional()
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
  @IsOptional()
  @MaxLength(250)
  @ApiProperty({
    description: "The category's description",
    example: 'Category Description',
  })
  description: string;
}
