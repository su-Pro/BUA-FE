/**
 * @作者 7七月
 * @微信公号 林间有风
 * @开源项目 $ http://7yue.pro
 * @免费专栏 $ http://course.7yue.pro
 * @我的课程 $ http://imooc.com/t/4294850
 * @创建时间 2019-10-28 04:12
 */
import {combination} from "../../utils/util";

class SkuCode {

    code
    spuId
    totalSegments = []

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    _splitToSegments() {
        // 2$1-44#3-9#4-14

        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#')
        const length = specCodeArray.length

        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i)
            const newSegments = segments.map(segs=>{
                return segs.join('#')
            })
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
        // 尽量少写显式的for循环
        // for for
        // 类、函数

    }
}

export {
    SkuCode
}