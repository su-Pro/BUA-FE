import { IsNotEmpty, IsString } from 'class-validator';


export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  uid: string
}
