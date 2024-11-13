import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class CreateNotificationDto {
  /**
   * The notification's date
   */
  @IsString()
  @ApiProperty({
    description: "The notification's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The notification's message
   */
  @IsString()
  @ApiProperty({
    description: "The notification's message",
    example: 'Notification Message',
  })
  message: string;

  /**
   * The notification's user
   */
  @IsNumber()
  @ApiProperty({
    description: "The notification's user",
    example: 1,
  })
  id_user: number;

  /**
   * The notification's thread
   */
  @IsNumber()
  @ApiProperty({
    description: "The notification's thread",
    example: 1,
  })
  id_thread: number;
}
