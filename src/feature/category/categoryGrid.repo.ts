import { EntityRepository, Repository } from 'typeorm';
import { GridCategory } from '../../entity/GridCategory';

@EntityRepository(GridCategory)
export class CategoryGridRepo extends Repository<GridCategory> {
  async getAllGridData(): Promise<GridCategory[]> {
    return this.find();
  }
}
