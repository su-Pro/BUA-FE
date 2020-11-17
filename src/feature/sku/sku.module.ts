import { Module } from '@nestjs/common';
import { SkuService } from './sku.service';
import { SkuController } from './sku.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SkuRepo } from './sku.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([SkuRepo])
  ],
  providers: [SkuService],
  controllers: [SkuController]
})
export class SkuModule {}
