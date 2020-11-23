import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepo } from './Activity.repo';
import { ActivityController } from './activity.controller';

@Module({
  imports:[TypeOrmModule.forFeature([ActivityRepo])],
  controllers:[ActivityController],
  providers: [ActivityService]
})
export class ActivityModule {}
