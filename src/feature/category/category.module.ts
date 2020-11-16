import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepo } from './category.repo';
import { CategoryGridRepo } from './categoryGrid.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoryRepo,CategoryGridRepo])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
