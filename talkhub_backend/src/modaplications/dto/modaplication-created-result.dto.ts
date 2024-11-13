import { ApiProperty } from '@nestjs/swagger';

export class ModAplicationCreatedResultDto {
  /**
   * The modaplication's id
   */
  @ApiProperty({
    description: "The modaplication's id",
    example: 1,
  })
  id_modaplication: number;
}
