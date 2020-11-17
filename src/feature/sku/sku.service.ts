import { Injectable } from '@nestjs/common';
import { SkuRepo } from './sku.repo';

import { InjectRepository } from '@nestjs/typeorm';
import { Sku } from '../../entity/Sku';
import { PaginationDTO } from './dto/Pagination.dto';

@Injectable()
export class SkuService {
  constructor(
    @InjectRepository(SkuRepo)
    private skuRepo: SkuRepo
  ) {
  }
  async getDetailSKU (skuId: number): Promise<Sku> {
    return this.skuRepo.getDetailSKU(skuId);
  }
  async getPaginationSKU (paginationDTO: PaginationDTO): Promise<Sku []> {
    return this.skuRepo.getPaginationSKU(paginationDTO);
  }
}
