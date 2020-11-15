import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { GridCategory } from '../../entity/GridCategory';

@Controller('category')
export class CategoryController {
  constructor(
    private categoryService: CategoryService
  ) {}
  @Get('grid')
  async getAllGridData ():Promise<GridCategory[]> {
    return this.categoryService.getAllGridData();
  }
  @Get('all/with_spu')
  async getAllCategoryWithSpu ():Promise<any> {
    return this.categoryService.getAllCategoryWithSpu();
  }
}
