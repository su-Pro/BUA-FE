import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ThemeRepo } from './theme.repo';
import { Theme } from '../../entity/Theme';
import { ThemeByNamesDTO } from './dto/ThemeByNames.dto';

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(ThemeRepo)
    private themeRepo: ThemeRepo
  ) {
  }
  async getThemeByNames (names: ThemeByNamesDTO): Promise<Theme[]> {
    return await this.themeRepo.findByNames(names);
  }
}
