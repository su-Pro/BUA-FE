import { EntityRepository, Repository } from 'typeorm';
import { Sku } from '../../entity/Sku';
import { PaginationDTO } from './dto/Pagination.dto';

@EntityRepository(Sku)
export class SkuRepo extends Repository<Sku>{
  async getDetailSKU (skuId: number): Promise<Sku> {
    //TODO: 查询标签数据
    const query = this.createQueryBuilder('sku')
     .where("sku.id = :skuId",{skuId});
    return await query.getOne();
  }
  async getPaginationSKU (paginationDTO: PaginationDTO): Promise<Sku []> {
    const query = this.createQueryBuilder("sku")
      .skip(paginationDTO.start)
      .take(paginationDTO.limit)
    return await query.getMany();
  }
}
