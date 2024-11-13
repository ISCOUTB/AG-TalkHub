import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateModAplicationDto {
  /**
   * The aplicant's id
   */
  @IsNumber()
  @ApiProperty({
    description: "The aplicant's id",
    example: 1,
  })
  id_user: number;

  /**
   * The modaplication's date
   */
  @IsString()
  @ApiProperty({
    description: "The modaplication's date",
    example: '2024-01-01',
  })
  date: string;

  /**
   * The aplication's reason
   */
  @IsString()
  @ApiProperty({
    description: "The aplication's reason",
    example: 'Aplication Reason',
  })
  reason: string;
}
