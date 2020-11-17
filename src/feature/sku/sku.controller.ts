import { Controller, Get, Param, Query } from '@nestjs/common';
import { SkuService } from './sku.service';
import { Sku } from '../../entity/Sku';
import { SkuIdPipe } from '../../core/pipe/sku-skuId.pipe';
import { PaginationDTO } from './dto/Pagination.dto';
import { SkuPaginationPipe } from '../../core/pipe/sku-skuPagination.pipe';

@Controller('sku')
export class SkuController {
  constructor(
    private skuService:SkuService
  ) {
  }
  @Get('detail/:id')
  async getDetailSKU (@Param("id",SkuIdPipe) skuId: number):Promise<Sku> {
    return this.skuService.getDetailSKU(skuId)
  }
  @Get('lists')
  async getPaginationSKU (@Query(SkuPaginationPipe) paginationDTO:PaginationDTO ): Promise<Sku []> {
    return this.skuService.getPaginationSKU(paginationDTO);
  }
}
