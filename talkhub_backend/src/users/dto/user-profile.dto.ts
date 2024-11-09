import { ApiProperty } from '@nestjs/swagger';

export class ProfileUserDto {
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
   * The user's id
   */
  @ApiProperty({
    description: "The user's id",
    example: 1,
  })
  id_user: number;

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
}
