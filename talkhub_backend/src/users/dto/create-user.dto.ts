import { IsEmail, IsString, MinLength } from 'class-validator';

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
  email: string;

  /**
   * The user's password
   */
  @IsString()
  @MinLength(6)
  password: string;
}
