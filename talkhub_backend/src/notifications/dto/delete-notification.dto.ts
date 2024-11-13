import { ApiProperty } from '@nestjs/swagger';

export class DeleteNotificationDto {
  /**
   * The notification's id
   */
  @ApiProperty({
    description: "The notification's id",
    example: 1,
  })
  id_notification: number;
}
