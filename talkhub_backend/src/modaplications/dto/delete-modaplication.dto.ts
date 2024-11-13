import { ApiProperty } from '@nestjs/swagger';

export class DeleteModAplicationDto {
  /**
   * The modaplication's id
   */
  @ApiProperty({
    description: "The modaplication's id",
    example: 1,
  })
  id_modaplication: number;
}
