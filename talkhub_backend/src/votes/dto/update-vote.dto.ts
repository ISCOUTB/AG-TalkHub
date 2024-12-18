import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class UpdateVoteDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The thread id',
    example: 1,
    required: false,
  })
  id_thread?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({
    description: 'The comment id',
    example: 1,
    required: false,
  })
  id_comment?: number;

  @IsNumber()
  @ApiProperty({
    description: 'The vote type',
    example: '1 (upvote) / 0 (downvote)',
  })
  type: number;

  constructor(
    type: number,
    id_thread: number | undefined,
    id_comment: number | undefined,
  ) {
    this.id_thread = id_thread;
    this.id_comment = id_comment;
    this.type = type;
  }
}
