import { Injectable } from '@nestjs/common';
import { CategoryRepo } from './category.repo';
import { CategoryGridRepo } from './categoryGrid.repo';
import { GridCategory } from '../../entity/GridCategory';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepo)
    private categoryRepo: CategoryRepo,
    @InjectRepository(CategoryGridRepo)
    private categoryGridRepo: CategoryGridRepo,
  ) {}
  async getAllGridData(): Promise<GridCategory[]>{
    return this.categoryGridRepo.getAllGridData();
  }
  getAllCategoryWithSpu ():Promise<any> {
    return this.categoryRepo.getAllCategoryWithSpu();
  }
}
