import { ApiProperty } from '@nestjs/swagger';

/**
 * This class is a data transfer object for a category
 */
export class CategoryListItemDto {
  /**
   * The category's id
   */
  @ApiProperty({
    description: "The category's id",
    example: 1,
  })
  id_category: number;

  /**
   * The category's name
   */
  @ApiProperty({
    description: "The category's name",
    example: 'Category Name',
  })
  name: string;

  /**
   * The category's description
   */
  @ApiProperty({
    description: "The category's description",
    example: 'Category Description',
  })
  description: string;
}
