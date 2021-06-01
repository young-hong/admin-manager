import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8000'
axios.interceptors.request.use((config) => {
  //如果项目中有将token绑定在请求数据的头部，服务器可以有选择的返回数据，只对有效的请求返回数据，这样写
  //这里是用户登录的时候，将token写入了sessionStorage中了，之后进行其他的接口操作时，进行身份验证。
  let token = window.localStorage.getItem("admin-token")
  if (token) {
    config.headers['authorization'] = token;
  }
  return config;
})
//在response中
axios.interceptors.response.use(
  response => {
    return response
    // if (response.status === 200) {
    //   return response
    // }

  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400: err.message = '请求错误(400)'; break;
        case 401: err.message = '未授权，请重新登录(401)'; break;
        case 403: err.message = '拒绝访问(403)'; break;
        case 404: err.message = '请求出错(404)'; break;
        case 408: err.message = '请求超时(408)'; break;
        case 500: err.message = '服务器错误(500)'; break;
        case 501: err.message = '服务未实现(501)'; break;
        case 502: err.message = '网络错误(502)'; break;
        case 503: err.message = '服务不可用(503)'; break;
        case 504: err.message = '网络超时(504)'; break;
        case 505: err.message = 'HTTP版本不受支持(505)'; break;
        default: err.message = `连接出错(${err.response.status})!`;
      }
    } else {
      err.message = '连接服务器失败!'
    }
    alert(err.message);
    return Promise.reject(err);
  }
)


const http = {
  post: '',
  get: '',
  put: '',
  delete: ''
}

http.post = function (api, data) {
  //let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.post(api, data).then(response => {
      resolve(response)
    })
  })
}

http.get = function (api, data) {
  //let params = qs.stringify(data);
  return new Promise((resolve, reject) => {
    axios.get(api, data).then(response => {
      resolve(response)
    })
  })
}

http.delete = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.delete(api, { data }).then(response => {
      resolve(response)
    })
  })
}

http.patch = function (api, data) {
  return new Promise((resolve, reject) => {
    axios.patch(api, data).then(response => {
      resolve(response)
    })
  })
}

export default http