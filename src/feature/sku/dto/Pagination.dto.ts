import { IsInt, Max, Min } from 'class-validator';


export class PaginationDTO {

  @IsInt()
  @Min(0)
  @Max(9999)
  start: number;

  @IsInt()
  limit: number;
}
