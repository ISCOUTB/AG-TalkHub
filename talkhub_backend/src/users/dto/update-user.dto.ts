import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

/**
 * This class is a data transfer object for creating a user
 * using class-validator
 */
export class UpdateUserDto {
  /**
   * The user's email
   */
  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  /**
   * The user's password
   */
  @IsString()
  @MinLength(6)
  @IsOptional()
  password: string;
}
