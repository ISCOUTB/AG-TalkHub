import { ApiProperty } from '@nestjs/swagger';

/**
 * The result of a thread creation
 */
export class ThreadCreatedResultDto {
  /**
   * The thread's id
   */
  @ApiProperty({
    description: "The thread's id",
    example: 1,
  })
  id_thread: number;
}
