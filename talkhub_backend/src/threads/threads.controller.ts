import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Delete,
} from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';
import { ApiResponse } from '@nestjs/swagger';
import { ApiOperation } from '@nestjs/swagger';

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadsService: ThreadsService) {}

  @ApiOperation({
    description: 'Create a new thread',
    operationId: 'createThread',
  })
  @ApiResponse({ status: 201, description: 'Thread created' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  createThread(@Body() createThreadDto: CreateThreadDto) {
    return this.threadsService.insert(createThreadDto);
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
