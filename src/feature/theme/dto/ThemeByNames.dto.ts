import { IsArray, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ThemeByNamesDTO {

  @ApiProperty() // swagger 文档

  @IsNotEmpty()
  @IsArray()
  names: string [];
}
