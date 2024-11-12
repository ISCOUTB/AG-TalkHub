import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { Public } from 'src/auth/public-route.metadata';
import { VoteListItemDto } from './dto/vote-list-item.dto';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { VoteCreatedResultDto } from './dto/VoteCreatedResult.dto';
import { UpdateVoteDto } from './dto/update-vote.dto';

@ApiBearerAuth()
@ApiTags('votes')
@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Public()
  @ApiOperation({
    description: 'Get all votes of a comment',
    operationId: 'getAllCommentVotes',
  })
  @ApiResponse({
    status: 200,
    description: 'All Comment Votes',
    type: [VoteListItemDto],
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Get(':id/comments')
  getAllCommentVotes(@Param('id', ParseIntPipe) id: number) {
    return this.votesService.getAllCommentVotes(id);
  }

  @ApiOperation({
    description: 'Get The Vote of a thread by a user',
    operationId: 'getThreadVoteByUser',
  })
  @ApiResponse({
    status: 200,
    description: 'The Vote of a thread by a user',
    type: VoteListItemDto,
  })
  @ApiResponse({ status: 404, description: 'Thread not found' })
  @Get(':id/thread/:id_user')
  getThreadVoteByUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_user', ParseIntPipe) id_user: number,
  ) {
    return this.votesService.getThreadVoteByUser(id, id_user);
  }

  @ApiOperation({
    description: 'Get The Vote of a comment by a user',
    operationId: 'getCommentVoteByUser',
  })
  @ApiResponse({
    status: 200,
    description: 'The Vote of a comment by a user',
    type: VoteListItemDto,
  })
  @ApiResponse({ status: 404, description: 'Comment not found' })
  @Get(':id/comment/:id_user')
  getCommentVoteByUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('id_user', ParseIntPipe) id_user: number,
  ) {
    return this.votesService.getCommentVoteByUser(id, id_user);
  }

  @Public()
  @ApiOperation({
    description: 'Get all votes of a thread',
    operationId: 'getAllThreadVotes',
  })
  @ApiResponse({
    status: 200,
    description: 'All Thread Votes',
    type: [VoteListItemDto],
  })
  @ApiResponse({ status: 404, description: 'Thread not found' })
  @Get(':id/threads')
  getAllThreadVotes(@Param('id', ParseIntPipe) id: number) {
    return this.votesService.getAllThreadVotes(id);
  }

  @ApiOperation({
    description: 'Create a new vote',
    operationId: 'createVote',
  })
  @ApiResponse({
    status: 201,
    description: 'Vote created',
    type: VoteCreatedResultDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Post()
  async createVote(@Body() createVoteDto: CreateVoteDto, @Req() req) {
    createVoteDto.id_user = req.user.sub;
    const result = await this.votesService.insert(createVoteDto);
    const dto = new VoteCreatedResultDto();
    dto.id_vote = Number(result.lastInsertRowid);
    return dto;
  }

  @ApiOperation({
    description: 'Update a vote',
    operationId: 'updateVote',
  })
  @ApiResponse({
    status: 200,
    description: 'Vote updated',
    type: UpdateVoteDto,
  })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @Patch('updateVote/:id')
  async updateVote(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVoteDto: UpdateVoteDto,
  ) {
    return this.votesService.updateById(id, updateVoteDto);
  }
}
