import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/create-app'

async function initMain() {
  new Vue({
    router,
    render: (h) => h(App)
  }).$mount('#app')
}

initMain().then(() => {
})
