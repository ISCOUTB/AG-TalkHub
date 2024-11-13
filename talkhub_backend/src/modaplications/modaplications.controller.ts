import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ModAplicationsService } from './modaplications.service';
import { ModAplicationDto } from './dto/modaplication.dto';
import { ModAplicationCreatedResultDto } from './dto/modaplication-created-result.dto';
import { CreateModAplicationDto } from './dto/create-modaplication.dto';
import { ModAplicationListItemDto } from './dto/modaplication-list-item.dto';

@ApiBearerAuth()
@ApiTags('modaplications')
@Controller('modaplications')
export class ModaplicationsController {
  constructor(private readonly modaplicationsService: ModAplicationsService) {}

  @ApiOperation({
    description: 'Get all modaplications',
    operationId: 'getAllModaplications',
  })
  @ApiResponse({
    status: 200,
    description: 'All modaplications',
    type: [ModAplicationListItemDto],
  })
  @ApiResponse({ status: 404, description: 'Modaplication not found' })
  @Get()
  getAllModaplications() {
    return this.modaplicationsService.getAllModaplications();
  }

  @ApiOperation({
    description: 'Get modaplication by id',
    operationId: 'getModaplicationById',
  })
  @ApiResponse({
    status: 200,
    description: 'Modaplication found',
    type: ModAplicationDto,
  })
  @ApiResponse({ status: 404, description: 'Modaplication not found' })
  @Get(':id')
  getModaplicationById(@Param('id', ParseIntPipe) id: number) {
    return this.modaplicationsService.getModaplicationById(id);
  }

  @ApiOperation({
    description: 'Create a new modaplication',
    operationId: 'createModaplication',
  })
  @ApiResponse({
    status: 201,
    description: 'Modaplication created',
    type: ModAplicationCreatedResultDto,
  })
  @Post()
  async createModaplication(
    @Body() createModAplicationDto: CreateModAplicationDto,
  ) {
    const result = await this.modaplicationsService.insert(
      createModAplicationDto,
    );
    const dto = new ModAplicationCreatedResultDto();
    dto.id_modaplication = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: 'Delete a modaplication',
    operationId: 'deleteModaplication',
  })
  @ApiResponse({
    status: 204,
    description: 'Modaplication deleted',
  })
  @Delete(':id')
  async deleteModaplication(@Param('id', ParseIntPipe) id: number) {
    await this.modaplicationsService.deleteById(id);
  }
}
