export class CommonTools {
  public static isInTimeLine(date: Date, start: Date, end: Date) {
    const numberDate = date.getTime();
    const numberStart = start.getTime();
    const numberEnd = end.getTime();
    if (numberDate > numberStart && numberDate < numberEnd) {
      return true;
    }
    return false;
  }

  /**
   * 比较val1是否小于val2
   * @param val1
   * @param val2
   */
  public static compareValue(val1:number,val2:number):boolean {
    return val1 < val2;
  }
}
