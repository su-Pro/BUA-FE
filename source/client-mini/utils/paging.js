import {Http} from "./http";
import {Locker} from "../models/locker"
// 瀑布流分页获取数据

class Paging {

  start
  limit
  req
  locker = new Locker()
  url
totalCount
  moreData = true
  itemList = []


  constructor(req, limit = 10, start = 0) {
    this.start = start
    this.limit = limit
    this.req = req,
    this.url = req.url
  }

  async getMoreData(totalCount) {
    if(!this.moreData){
      return
    }
    if(!this.locker.getLocker()){
      return
    }
    // 只在有更多数据并锁开着情况下获取数据
    const data =await this._actualGetData()
    this.locker.releaseLocker()
    console.log(data);
    
    return data
  }

  // 获取数据
  async _actualGetData() {
    const req = this._getCurrentReq()
    let paging = await Http.request(req)
    this.totalCount=paging[1]
    if(!paging[0]){
      return null
    }
    if(this.totalCount === 0){
      return {
        empty:true,
        items:[],
        moreData:false,
        itemList:[]
      }
    }
    // 将总页数与当前页数比较确定是否还有更多数据
    // 若还有数据则累加start以便下次请求使用
    this.moreData = Paging._moreData(this.start,this.limit,this.totalCount)
    if(this.moreData){
      this.start += this.limit

    }
    this._accumulate(paging[0])
    return {
      empty:false,
      items: paging[0],
      moreData:this.moreData,
      itemList:this.itemList,
      totalCount:this.totalCount
    }
  }
  // 累积的所有spu
  _accumulate(items){
    this.itemList = this.itemList.concat(items)
  }
  // 是否还有更多数据
  static _moreData(start,limit,totalCount) {
    return (start+limit) < totalCount
  }
  // 拼接获取更多数据的url 获取从start起count位数据
  _getCurrentReq() {
    let url = this.url
    const params = `start=${this.start}&limit=${this.limit}`
    if(url.includes('?')){
      url += '&' + params
      // contains
    }
    else{
      url += '?' + params
    }
    this.req.url  = url
    return this.req
  }

}

export {
  Paging
}
