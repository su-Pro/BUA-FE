import { IsNotEmpty } from 'class-validator';

export class GetOrderStatusDTO {
  @IsNotEmpty()
  status: string
}
