import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'src/repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';
import * as schema from '../db/schema';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoriesService extends Repository<
  CategoryDto,
  CreateCategoryDto,
  UpdateCategoryDto
> {
  /**
   * Create a new CategoriesService instance
   * @param drizzle DrizzleBetterSQLite3Database instance
   */
  constructor(
    @Inject('DB_PROD')
    public drizzle: BetterSQLite3Database<typeof schema>,
  ) {
    super(drizzle, schema.categories);
  }
  async getAllTableItems() {
    return this.drizzle.query.categories.findMany({
      columns: {
        id_category: true,
        name: true,
        description: true,
      },
    });
  }
  async getCategoryById(id: number): Promise<CategoryDto> {
    return this.drizzle.query.categories.findFirst({
      where: (categories, { eq }) => eq(categories.id_category, id),
      with: {
        threads: true,
      },
      columns: {
        id_category: true,
        name: true,
        description: true,
      },
    });
  }
}
