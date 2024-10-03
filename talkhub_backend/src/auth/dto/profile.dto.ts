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
