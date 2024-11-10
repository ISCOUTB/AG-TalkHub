import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  ParseIntPipe,
  Get,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentCreatedResultDto } from './dto/comment-created-result.dto';
import { CommentListItemDto } from './dto/comment-list-item.dto';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    description: 'Get all comments',
    operationId: 'getAllComments',
  })
  @ApiResponse({
    status: 200,
    description: 'All comments',
    type: [CommentListItemDto],
  })
  @Get()
  findAll() {
    return this.commentsService.getAllTableItems();
  }

  @ApiOperation({
    description: 'Get all comments of a user',
    operationId: 'getAllUserComments',
  })
  @ApiResponse({
    status: 200,
    description: 'Comments found',
    type: CommentListItemDto,
  })
  @ApiResponse({ status: 404, description: 'Thread not found' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.getAllUserComments(id);
  }

  @ApiOperation({
    description: 'Create a new comment',
    operationId: 'createComment',
  })
  @ApiResponse({
    status: 201,
    description: 'Comment created',
    type: CommentCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createComment(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    createCommentDto.id_user = req.user.sub;
    const result = await this.commentsService.insert(createCommentDto);
    const dto = new CommentCreatedResultDto();
    dto.id_comment = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: 'Update a comment',
    operationId: 'updateComment',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment updated',
    type: CommentCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch(':id')
  updateComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.updateById(id, updateCommentDto);
  }

  @ApiOperation({
    description: 'Delete a comment',
    operationId: 'deleteComment',
  })
  @ApiResponse({
    status: 200,
    description: 'Comment deleted',
    type: CommentCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteById(id);
  }
}
