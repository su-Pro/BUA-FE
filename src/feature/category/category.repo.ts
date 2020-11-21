import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../entity/Category';
import { Sku } from 'src/entity/Sku';

@EntityRepository(Category)
export class CategoryRepo extends Repository<Category>{
  async getAllCategoryWithSpu (): Promise<any> {
    const query = await this.find({
      relations: ["skuList"],
    })
    return query;
  }
}
