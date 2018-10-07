import originJsonp from 'jsonp'

// 自定义jsonp,并且进行Promise化
export default function jsonp(url, data, option) {
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)

  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 将查询参数拼接到url
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    url += '&' + k + '=' + encodeURIComponent(value)
    // 方式二：url += `&${k}=${encodeURIComponent(value)}`
    // encodeURIComponent() 函数可把字符串作为 URI 组件进行编码。
  }
  return url ? url.substring(1) : ''
}
