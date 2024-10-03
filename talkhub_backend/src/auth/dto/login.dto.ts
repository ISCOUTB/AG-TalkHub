import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/**
 * This class is a data transfer object for logging in a user
 */
export class LoginDto {
  /**
   * The user's email
   */
  @IsString()
  @IsEmail()
  @ApiProperty({
    description: "The user's email",
    example: 'example@talkhub.com',
  })
  email: string;
  /**
   * The user's password
   */
  @IsString()
  @ApiProperty({
    description: "The user's password",
    example: 'password',
  })
  password: string;
}
