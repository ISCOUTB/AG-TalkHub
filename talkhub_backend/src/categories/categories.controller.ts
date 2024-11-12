import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
  Get,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryCreatedResultDto } from './dto/category-created-result.dto';
import { CategoryListItemDto } from './dto/category-list-item.dto';
import { CategoryDto } from './dto/category.dto';

@ApiBearerAuth()
@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({
    description: 'Get all categories',
    operationId: 'getAllCategories',
  })
  @ApiResponse({
    status: 200,
    description: 'All categories',
    type: [CategoryListItemDto],
  })
  @Get()
  findAll() {
    return this.categoriesService.getAllTableItems();
  }

  @ApiOperation({
    description: 'Get a category by id',
    operationId: 'getCategoryById',
  })
  @ApiResponse({
    status: 200,
    description: 'Category found',
    type: CategoryDto,
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @ApiOperation({
    description: 'Create a new category',
    operationId: 'createCategory',
  })
  @ApiResponse({
    status: 201,
    description: 'Category created',
    type: CategoryCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesService.insert(createCategoryDto);
    const dto = new CategoryCreatedResultDto();
    dto.id_category = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: 'Update a category',
    operationId: 'updateCategory',
  })
  @ApiResponse({
    status: 200,
    description: 'Category updated',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch(':id')
  updateCategory(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateById(id, updateCategoryDto);
  }

  @ApiOperation({
    description: 'Delete a category',
    operationId: 'deleteCategory',
  })
  @ApiResponse({
    status: 200,
    description: 'Category deleted',
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.deleteById(id);
  }
}
