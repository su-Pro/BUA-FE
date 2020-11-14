import { Theme } from '../../entity/Theme';
import { EntityRepository, Repository } from 'typeorm';
import { ThemeByNamesDTO } from './dto/ThemeByNames.dto';
import { _httpException } from '../../core/exception/http.excetion';
import { ErrorThemeByNamesDB } from '../../constants/http.errror';



@EntityRepository(Theme)
export class ThemeRepo extends Repository<Theme> {
  async findByNames(names: ThemeByNamesDTO): Promise<Theme []> {
    let themeList:Theme[];
    try {
       const query =  this.createQueryBuilder('theme')
        .where('theme.name IN (:...names)', { names });
        themeList = await query.getMany();
    } catch (e) {
    //  XXX: 数据库操作异常处理如何做？是否每一个数据操作都要 tryC？
    throw new _httpException(new ErrorThemeByNamesDB())
    }
    return themeList;
  }
}
