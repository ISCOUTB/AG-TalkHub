import { ApiProperty } from '@nestjs/swagger';

export class BanCreatedResultDto {
  /**
   * The ban's id
   */
  @ApiProperty({
    description: "The ban's id",
    example: 1,
  })
  id_ban: number;
}
