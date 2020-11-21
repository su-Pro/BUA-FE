import { IsInt, Max, Min } from 'class-validator';
import { MAXIMUM_BUY_SKU } from '../../../constants/common.constants';

export class SkuInfoDTO {
  id;
  @IsInt()
  @Min(1)
  @Max(MAXIMUM_BUY_SKU)
  count: number;
}
