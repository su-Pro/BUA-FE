class Locker {

  locker = false
  constructor() {
  }

  // 关锁
  getLocker() {
    if (this.locker) {
      return false
    }
    this.locker = true
    return true
  }
// 开锁
  releaseLocker() {
    this.locker = false
  }


}
export {
  Locker
}
