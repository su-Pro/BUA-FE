import { User } from '../entity/User';

/**
 * 主要用于在当前进程中保存用户身份，方便在其他模块中获取
 */
export class LocalUser {
  private static user: User;
  public static getUser() {
    return LocalUser.user;
  }
  public static setUser(user: User) {
    LocalUser.user = user;
  }
  public static getUserID() {
    if (LocalUser.user) {
      return LocalUser.user.id;
    }
  }
}
