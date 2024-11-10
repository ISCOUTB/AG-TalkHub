import { ApiProperty } from '@nestjs/swagger';

/**
 * The profile data transfer object
 */
export class ProfileDto {
  /**
   * The user's id
   */
  @ApiProperty({
    description: "The user's id",
    example: 1,
  })
  id: number;

  /**
   * The user's email
   */
  @ApiProperty({
    description: "The user's email",
    example: 'example@talkhub.com',
  })
  email: string;

  /**
   * The user's name
   */
  @ApiProperty({
    description: "The user's name",
    example: 'John Doe',
  })
  name: string;

  /**
   * The user's role
   */
  @ApiProperty({
    description: "The user's role",
    example: 'regular',
    enum: ['admin', 'regular', 'moderator'],
  })
  role: string;

  /**
   * The user's bio
   */
  @ApiProperty({
    description: "The user's bio",
    example: 'This is my bio',
  })
  bio: string;

  /**
   * The user's creation date
   */
  @ApiProperty({
    description: "The user's creation date",
    example: '2021-01-01',
  })
  creation_date: string;
  /**
   * The time the token was issued
   */
  @ApiProperty({
    description: 'The time the token was issued',
    example: 1600000000,
  })
  iat: number;
  /**
   * The time the token expires
   */
  @ApiProperty({
    description: 'The time the token expires',
    example: 1600000000,
  })
  exp: number;
}
