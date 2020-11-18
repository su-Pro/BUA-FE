import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../../entity/Category';

@EntityRepository(Category)
export class CategoryRepo extends Repository<Category>{
  async getAllCategoryWithSpu (): Promise<any> {
    return null;
  }
}
