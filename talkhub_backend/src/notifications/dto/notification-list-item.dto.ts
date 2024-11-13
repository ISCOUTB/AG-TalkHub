import { ApiProperty } from '@nestjs/swagger';

export class NotificationThreadListItemDto {
  /**
   * The thread's id
   */
  @ApiProperty({
    description: "The thread's id",
    example: 1,
  })
  id_thread: number;

  /**
   * The thread's title
   */
  @ApiProperty({
    description: "The thread's title",
    example: 'title',
  })
  title: string;
}
export class NotificationUserListItemDto {
  /**
   * The thread's id
   */
  @ApiProperty({
    description: "The user's id",
    example: 1,
  })
  id: number;

  /**
   * The thread's title
   */
  @ApiProperty({
    description: "The user's name",
    example: 'title',
  })
  name: string;
}
/**
 * This class is a data transfer object for a notification
 */
export class NotificationListItemDto {
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
    type: NotificationUserListItemDto,
  })
  user: NotificationUserListItemDto;

  /**
   * The notification's thread
   */
  @ApiProperty({
    description: "The notification's thread",
    example: 1,
    type: NotificationThreadListItemDto,
  })
  thread: NotificationThreadListItemDto;
}
