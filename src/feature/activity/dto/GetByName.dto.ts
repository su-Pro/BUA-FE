import { IsNotEmpty } from 'class-validator';

export class GetByNameDTO {
  @IsNotEmpty()
  name:string
}
