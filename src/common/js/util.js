function getRandomInt(min, max) {
  // 返回一个包括min和max的,介于两者之间的数
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  // 打乱数组
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let j = getRandomInt(0, i)
    let t = _arr[i]
    _arr[i] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

export function debounce(func, delay) {
  // 节流函数
  let timer

  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}