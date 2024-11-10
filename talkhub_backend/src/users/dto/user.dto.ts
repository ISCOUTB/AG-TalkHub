import { ApiProperty } from '@nestjs/swagger';

/**
 * User Data Transfer Object
 */
export class UserDto {
  /**
   * User ID
   */
  @ApiProperty({
    description: 'The user ID',
    example: 1,
  })
  id: number;
  /**
   * User Name
   */
  @ApiProperty({
    description: 'The user name',
    example: 'John Doe',
  })
  name: string;
  /**
   * User Email
   */
  @ApiProperty({
    description: 'The user email',
    example: 'example@talkhub.com',
  })
  email: string;
  /**
   * User Bio
   */
  @ApiProperty({
    description: 'The user bio',
    example: 'This is my bio',
  })
  bio: string;
  /**
   * User creation date
   */
  @ApiProperty({
    description: 'The user creation date',
    example: '2021-01-01',
  })
  creation_date: string;
  /**
   * User Role
   */
  @ApiProperty({
    description: 'The user role',
    example: 'regular',
    enum: ['admin', 'regular', 'moderator'],
  })
  role: string;

  /**
   * Create a new UserDto instance
   * @param id User ID
   * @param name User Name
   * @param email User Email
   * @param bio User Bio
   * @param creation_date User creation date
   * @param role User Role
   */
  constructor(
    id: number,
    name: string,
    email: string,
    bio: string,
    creation_date: string,
    role: string,
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.bio = bio;
    this.creation_date = creation_date;
    this.role = role;
  }
}
