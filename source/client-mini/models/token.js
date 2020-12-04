import {config} from "../config/config";
import {promisic} from "../utils/util";

class Token {
  // 1. 携带Token
  // server 请求Token

  // 登录 token -> storage

  // token 1. token不存在 2.token 过期时间
  // 静默登录

  constructor() {
    this.tokenUrl = config.apiBaseUrl + "token"
    // this.verifyUrl = config.apiBaseUrl + "token/verify"
  }

  async verify() {
    // 同步获取本地缓存中存储的token
    let token = wx.getStorageSync('token')
    if (!token) {
      token =  await this.getTokenFromServer()
    }
    return token
  }
  // 通过login获取code码去服务器换取Token，并同步的将Token设置到本地缓存中
  async getTokenFromServer() {
    // code
    const r = await wx.login()
    const code = r.code
    console.log(code);


    const res = await promisic(wx.request)({
      url: this.tokenUrl,
      method: 'POST',
      data: {
        uid: code,
      },
    })
    wx.setStorageSync('token', res.data.token)
    return res.data.token
  }
  // 去服务器验证缓存的token是否有效，若失效重新获取
  async _verifyFromServer(token) {
    const res = await promisic(wx.request)({
      url: this.verifyUrl,
      method: 'POST',
      data: {
        token
      }
    })

    const valid = res.data.is_valid
    if (!valid) {
      return this.getTokenFromServer()
    }
  }

}

export {
  Token
}
