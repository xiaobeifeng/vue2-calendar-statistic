import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'
import { utilAlertDialog, utilLogout } from '@/utils'
import router from '@/router'
import Vue from 'vue'

Vue.prototype.axios = axios
axios.defaults.baseURL = process.env.VUE_APP_BUS_REQUEST_PATH
axios.defaults.timeout = 0

const loading = () => {
  Toast.loading({
    icon: require('@/assets/icon/public/loading.gif'),
    forbidClick: true,
    className: 'loading',
    duration: 0
  })
}

const clearLoading = () => Toast.clear()

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 * @param other
 */
const errorHandle = (status, other) => {
  console.log(status)
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      router.replace({
        name: 'login'
      }).then()
      break
    // 403 token过期
    // 清除token并跳转登录页
    case 403:
      utilAlertDialog('登录过期，请重新登录', () => {
        router.replace({
          name: 'login'
        }).then(r => {
          utilLogout()
        })
      })
      break
    // 404请求不存在
    case 404:
      utilAlertDialog('请求的资源不存在')
      break
    case 413:
      utilAlertDialog('413 Request Entity Too Large')
      break
    default:
      console.log(other)
  }
}

axios.interceptors.request.use(
  config => {
    console.log(config)
    if (!config.headers.noLoading) {
      loading()
    }
    const accessToken = store.getters['storeLogin/getAccessToken']
    accessToken && (config.headers.accessToken = accessToken)
    // customToken 为标识，不设置 accessToken
    if (config.headers['customToken']) {
      config.headers.accessToken = ''
    }
    delete config.headers['flag']
    delete config.headers['customToken']
    delete config.headers['withoutMock']
    delete config.headers['restfulType']
    delete config.headers['noLoading']
    delete config.headers['businessRestful']
    delete config.headers['isPublic']

    return config
  },
  error => {
    clearLoading()
    return Promise.reject(error)
  }
)
/**
 * response拦截器
 */
axios.interceptors.response.use(

  response => {
    clearLoading()
    if (response.status === 200) {
      if (response.data.code === 0) {
        return response.data.data || response.data
      } else {
        utilAlertDialog(response.data.message || '请稍后再试')
        return Promise.reject(response)
      }
    } else {
      utilAlertDialog(response.data.message || '请稍后再试')
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    clearLoading()
    const { response } = error
    console.log(response)
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      // 处理断网的情况
      // eg:请求超时或断网时，更新state的network状态
      // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      //   store.commit('changeNetwork', false);
    }
  }
)
// export default axios
