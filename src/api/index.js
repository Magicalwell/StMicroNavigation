import axios from 'axios'

const serve = axios.create({
  baseURL: 'http://127.0.0.1:80/',
  timeout: 15000
})
serve.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
const apiDictionary = [
  { VUE_APP_BASE_API: ['/getUserInfo', '/userlogin'] },
  { VUE_APP_SERVES_API: ['/getDocumentList'] }
]
const servesMap = new Map()
for (const item of apiDictionary) {
  Object.keys(item)
  servesMap.set(Object.keys(item)[0], item[Object.keys(item)[0]])
}

function getBaseUrl(val) {
  for (const [key, value] of servesMap.entries()) {
    if (value.includes(val)) {
      return key
    }
  }
  return 'VUE_APP_BASE_API'
}
// axios.defaults.baseURL = 'http://47.119.131.221:3080/'
export function defaultHttp(url, data, type = 'post') {
  return serve({
    url: process.env[getBaseUrl(url)] + url,
    method: type,
    data
  })
}
export default serve
