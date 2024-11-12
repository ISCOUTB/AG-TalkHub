import { ApiProperty } from '@nestjs/swagger';

export class VoteDto {
  @ApiProperty({
    description: 'The vote id',
    example: 1,
  })
  id_vote: number;

  @ApiProperty({
    description: 'The comment id',
    example: 1,
  })
  id_comment: number;

  @ApiProperty({
    description: "The category's vote",
    example: 1,
  })
  id_thread: number;

  @ApiProperty({
    description: 'The vote type',
    example: '0 (none) / 1 (upvote) / 2 (downvote)',
  })
  type: number;
}
