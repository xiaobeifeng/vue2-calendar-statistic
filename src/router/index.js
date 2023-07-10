import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const indexRouter = [
  {
    path: '/'
  }
]

const routerContext = require.context('@/router/modules/', true, /\.js$/)
routerContext.keys().forEach(route => {
  const routerModule = routerContext(route)
  indexRouter[0].children.push(routerModule.default)
})
console.log(indexRouter)
const index = new Router({
  routes: indexRouter
})

export default index
