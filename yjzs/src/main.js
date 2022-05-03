import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import animated from 'animate.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(animated)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
