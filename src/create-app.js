import lodash from 'lodash'
import Vant from 'vant'
import 'vant/lib/index.less'
import 'vant/lib/icon/local.css'
import 'amfe-flexible'
import VConsole from 'vconsole'
import Vue from 'vue'
Vue.use(lodash)
Vue.use(Vant)
Vue.config.productionTip = false
if (process.env.VUE_APP_ENV === 'development') {
  // eslint-disable-next-line
  new VConsole()
  Vue.config.productionTip = true
} else {
  // eslint-disable-next-line
  // new VConsole()
  Vue.config.productionTip = false
}
