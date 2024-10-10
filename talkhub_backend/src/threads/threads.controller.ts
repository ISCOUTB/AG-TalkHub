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
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { ThreadCreatedResultDto } from './dto/ThreadCreatedResultDto';
import { ThreadListItemDto } from './dto/thread-list-item.dto';

@ApiBearerAuth()
@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @ApiOperation({
    description: 'Get all threads',
    operationId: 'getAll',
  })
  @ApiResponse({
    status: 200,
    description: 'All threads',
    type: [ThreadListItemDto],
  })
  @Get()
  findAll() {
    return this.threadsService.getAllTableItems();
  }

  @ApiOperation({
    description: 'Create a new thread',
    operationId: 'createThread',
  })
  @ApiResponse({
    status: 201,
    description: 'Thread created',
    type: ThreadCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createThread(@Body() createThreadDto: CreateThreadDto) {
    const result = await this.threadsService.insert(createThreadDto);
    const dto = new ThreadCreatedResultDto();
    dto.id_thread = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: 'Update a thread',
    operationId: 'updateThread',
  })
  @ApiResponse({ status: 200, description: 'Thread updated' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch(':id')
  updateThread(
    @Body() updateThreadDto: UpdateThreadDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.threadsService.updateById(id, updateThreadDto);
  }

  @ApiOperation({
    description: 'Delete a thread',
    operationId: 'delete thread',
  })
  @ApiResponse({ status: 200, description: 'Thread deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  deleteThread(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.deleteById(id);
  }
}
