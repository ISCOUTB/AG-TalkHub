import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
  Get,
  Req,
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
import { CommentsService } from 'src/comments/comments.service';
import { CommentListItemDto } from 'src/comments/dto/comment-list-item.dto';
import { ThreadDto } from './dto/thread.dto';
import { Public } from 'src/auth/public-route.metadata';

@ApiBearerAuth()
@ApiTags('threads')
@Controller('threads')
export class ThreadsController {
  constructor(
    private readonly threadsService: ThreadsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Public()
  @ApiOperation({
    description: 'Get all threads',
    operationId: 'getAllThreads',
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

  @Public()
  @ApiOperation({
    description: 'Get all threads of category',
    operationId: 'getThreadsByCategory',
  })
  @ApiResponse({
    status: 200,
    description: 'All threads of category',
    type: [ThreadListItemDto],
  })
  @ApiResponse({ status: 404, description: 'Category not found' })
  @Get(':id/threads')
  getThreadsByCategory(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.getThreadsByCategory(id);
  }

  @Public()
  @ApiOperation({
    description: 'Get all comments of a thread',
    operationId: 'getThreadComments',
  })
  @ApiResponse({
    status: 200,
    description: 'All comments of a thread',
    type: [CommentListItemDto],
  })
  @Get(':id/comments')
  getThreadComments(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getThreadComments(id);
  }

  @Public()
  @ApiOperation({
    description: 'Get a thread by id',
    operationId: 'getThreadById',
  })
  @ApiResponse({
    status: 200,
    description: 'Thread found',
    type: ThreadDto,
  })
  @ApiResponse({ status: 404, description: 'Thread not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.getThreadById(id);
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
  async createThread(@Body() createThreadDto: CreateThreadDto, @Req() req) {
    createThreadDto.id_user = req.user.sub;
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
    operationId: 'deleteThread',
  })
  @ApiResponse({ status: 200, description: 'Thread deleted' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  deleteThread(@Param('id', ParseIntPipe) id: number) {
    return this.threadsService.deleteById(id);
  }
}
