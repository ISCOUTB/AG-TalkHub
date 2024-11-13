import { ApiProperty } from '@nestjs/swagger';

export class NotificationDto {
  /**
   * The notification's id
   */
  @ApiProperty({
    description: "The notification's id",
    example: 1,
  })
  id_notification: number;

  /**
   * The notification's date
   */
  @ApiProperty({
    description: "The notification's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The notification's message
   */
  @ApiProperty({
    description: "The notification's message",
    example: 'Notification Message',
  })
  message: string;

  /**
   * The notification's user
   */
  @ApiProperty({
    description: "The notification's user",
    example: 1,
  })
  id_user: number;

  /**
   * The notification's thread
   */
  @ApiProperty({
    description: "The notification's thread",
    example: 1,
  })
  id_thread: number;
}
