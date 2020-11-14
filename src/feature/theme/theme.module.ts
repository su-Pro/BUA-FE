import { Module } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeController } from './theme.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThemeRepo } from './theme.repo';

@Module({
  imports: [
    TypeOrmModule.forFeature([ThemeRepo])
  ],
  providers: [ThemeService],
  controllers: [ThemeController]
})
export class ThemeModule {}
