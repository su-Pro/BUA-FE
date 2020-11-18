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
}
