import { Repository } from 'typeorm';
import { Category } from '../../entity/Category';

export class CategoryRepo extends Repository<Category>{
  async getAllCategoryWithSpu (): Promise<any> {
    return null;
  }
}
