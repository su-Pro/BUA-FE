Date.prototype.format = function (fmt) {
    let o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (let k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

function toDate(dateStr) {
    return new Date(dateStr)
}

function getSlashYMD(dateStr) {
    const date = toDate(dateStr)
    return date.format('yyyy/M/d')
}

function getDotYMD(dateStr) {
    const date = toDate(dateStr)
    return date.format('yyyy.MM.dd')
}

function getSlashYMDHMS(dateStr) {
    const date = toDate(dateStr)
    return date.format('yyyy/MM/dd hh:mm:ss')
}


export {
    toDate,
    getSlashYMD,
    getDotYMD,
    getSlashYMDHMS
}
