import { EntityRepository, Repository } from 'typeorm';
import { Sku } from '../../entity/Sku';
import { PaginationDTO } from './dto/Pagination.dto';
import { Query } from '@nestjs/common';

@EntityRepository(Sku)
export class SkuRepo extends Repository<Sku> {
  async getDetailSKU(skuId: number): Promise<Sku> {
    //TODO: 查询标签数据
    const query = this.createQueryBuilder('sku')
      .where('sku.id = :skuId', { skuId });
    return await query.getOne();
  }

  async getPaginationSKU(paginationDTO: PaginationDTO): Promise<Sku []> {
    const query = this.createQueryBuilder('sku')
      .skip(paginationDTO.start)
      .take(paginationDTO.limit);
    return await query.getMany();
  }

  async findSkuByIdList(skuIdList: any[]): Promise<Sku[]> {
    const query = this.createQueryBuilder('sku')
      .where('sku.id IN (:skuIdList)', { skuIdList })
      .andWhere('sku.online = :online', { online: 1 });
    return await query.getMany();
  }

  async reduceStock(sid: number, toMinusStock: number) {
    const query = this.createQueryBuilder('sku')
      .update(Sku)
      .set({
        stock: () => 'stock - :toMinusStock',
      })
      .where('id = :sid', { sid })
      .andWhere('stock > :toMinusStock', { toMinusStock });
    return await query.execute();
  }
}
