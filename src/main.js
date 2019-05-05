import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import '@/common/stylus/index.styl'
import 'element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload)

// or with options
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './common/image/default.png',
  loading: './common/image/default.png',
  attempt: 1
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
