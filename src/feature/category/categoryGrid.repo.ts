import { Repository } from 'typeorm';

import { GridCategory } from '../../entity/GridCategory';

export class CategoryGridRepo extends Repository<GridCategory>{
  async getAllGridData ():Promise<GridCategory[]> {
    return this.find();
  }
}
