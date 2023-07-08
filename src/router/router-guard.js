import router from '@/router/index'
import store from '@/store'
import { utilAddKeepAliveWithRouteName, utilRemoveKeepAliveWithRouteName } from '@/utils'

router.beforeEach((to, from, next) => {
  if (to.meta['keepAlive']) {
    utilAddKeepAliveWithRouteName(to.name)
  }
  if (store.getters['storePlatform/getIsHanWeb']) {
    // 苏服办应用内嵌
    next()
    return
  }
  // 连云港应用内嵌
  const accessToken = store.getters['storeLogin/getAccessToken']
  console.log('router.beforeEach storeLogin/getAccessToken' + accessToken)
  if (to.name === 'register') {
    next()
    return
  }
  if (!accessToken && to.name !== 'login') {
    next({ name: 'login' })
    return
  }
  next()
})

router.afterEach((to, from, next) => {
  console.log('to' + to)
  console.log('from' + from)
  // 处理路由缓存
  if (
    (to.name === 'home' && from.name === 'insured-tabs') ||
    (to.name === 'insured-tabs' && from.name === 'insured-tabs-detail') ||
    (to.name === 'insured-tabs' && from.name === 'signature') ||
    (to.name === 'home' && from.name === 'insured-checked') ||
    // 评估列表返回首页
    (to.name === 'home' && from.name === 'evaluator-tabs') ||
    // 评估单详情返回评估列表
    (to.name === 'evaluator-tabs' && from.name === 'evaluator-detail') ||
    // 服务详情返回服务列表
    (to.name === 'caregiver-tabs' && from.name === 'service-detail')
  ) {
    utilRemoveKeepAliveWithRouteName(from.name)
  }
})
