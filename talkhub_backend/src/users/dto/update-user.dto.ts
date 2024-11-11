import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    description: 'The user email',
    example: 'example@talkhub.com',
  })
  email: string;
  /**
   * The user's name
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'The user name',
    example: 'John Doe',
  })
  name: string;

  /**
   * The user's role
   */
  @IsString()
  @IsIn(['admin', 'regular', 'moderator'])
  @IsOptional()
  @ApiProperty({
    description: "The user's role",
    example: 'regular',
    enum: ['admin', 'regular', 'moderator'],
  })
  role: string;

  /**
   * The user's bio
   */
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: "The user's bio",
    example: 'I am a software engineer',
  })
  bio: string;

  constructor(name: string, email: string, bio: string, role: string) {
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.role = role;
  }
}
