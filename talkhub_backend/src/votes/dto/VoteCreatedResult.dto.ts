import { ApiProperty } from '@nestjs/swagger';

export class VoteCreatedResultDto {
  @ApiProperty({
    description: 'Vote id',
    example: 1,
  })
  id_vote: number;
}
