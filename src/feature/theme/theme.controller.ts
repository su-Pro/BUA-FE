import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ThemeByNamesDTO } from './dto/ThemeByNames.dto';
import { ThemesNamePipe } from '../../core/pipe/themes-name.pipe';
import { Theme } from '../../entity/Theme';

@Controller('theme')
export class ThemeController {
  constructor(
    private themeService: ThemeService
  ) {
  }
  @Get('by/names')
  async getThemesByNames(@Query("names",ThemesNamePipe) themeByNamesDTO: ThemeByNamesDTO):Promise<Theme[]> {
    return this.themeService.getThemeByNames(themeByNamesDTO);
  }
}
