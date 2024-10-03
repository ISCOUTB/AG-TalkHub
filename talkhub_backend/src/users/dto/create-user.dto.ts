import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsIn, IsString, MinLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a user
 * using class-validator
 */
export class CreateUserDto {
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
  @MinLength(6)
  @ApiProperty({
    description: "The user's password",
    example: 'password',
  })
  password: string;

  /**
   * The user's name
   */
  @IsString()
  @ApiProperty({
    description: "The user's name",
    example: 'John Doe',
  })
  name: string;

  /**
   * The user's role
   */
  @IsString()
  @IsIn(['admin', 'regular', 'moderator'])
  @ApiProperty({
    description: "The user's role",
    example: 'regular',
    enum: ['admin', 'regular', 'moderator'],
  })
  role: string;
}
