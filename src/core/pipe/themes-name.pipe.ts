import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ThemesNamePipe implements PipeTransform {
  async transform(value: string, { metatype }: ArgumentMetadata) {
    if(!metatype || !this.toValidate(metatype)) {
      // TODO: 错误提取
      throw new Error('error')
    }
    // 转化成数组形式
    let translateValue: string [];
    try {
     translateValue = value.split(",")
    }catch (e) {
    //  如果转化数组出错，依然抛出异常提示参数有误
      throw new Error("error")
    }
    const object = plainToClass(metatype, translateValue);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new Error("error")
    }
    return translateValue;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype:Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
