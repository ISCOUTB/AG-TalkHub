import { ApiProperty } from '@nestjs/swagger';

/**
 * The result of a category creation
 */
export class CategoryCreatedResultDto {
  /**
   * The category's id
   */
  @ApiProperty({
    description: "The category's id",
    example: 1,
  })
  id_category: number;
}
