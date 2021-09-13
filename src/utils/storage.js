/* 封装本地存储模块 */

export const getItem = name => {
  // 获取数据
  const data = window.localStorage.getItem(name)
  try {
    // data 可能不是json格式的字符串 用try catch 来捕获错误
    // 尝试把数据转为json对象
    return JSON.parse(data)
  } catch (err) {
    // data不是转换错误就直接返回
    return data
  }
}

export const setItem = (name, value) => {
  // 判断传过来的数据是不是对象 如果是对象就转为json格式的字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  // 存入数据
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}

export const clearItem = () => {
  window.localStorage.clearItem()
}
