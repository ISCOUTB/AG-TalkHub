import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export class CreateVoteDto {
  @IsNumber()
  @ApiProperty({
    description: 'The user id',
    example: 1,
  })
  id_user: number;

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
    example: '0 (downvote) / 1 (upvote) ',
  })
  type: number;
}
