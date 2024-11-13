import { ApiProperty } from '@nestjs/swagger';

/**
 * The result of a notification creation
 */
export class NotificationCreatedResultDto {
  /**
   * The notification's id
   */
  @ApiProperty({
    description: "The notification's id",
    example: 1,
  })
  id_notification: number;
}
