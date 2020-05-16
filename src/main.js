import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import './styles/main.scss'

import Swift from './Swift'
if(!window.native){
  window.native = Swift;
}
Vue.config.productionTip = false
Vue.use(VueAxios, Axios)

window.axios = Axios;

window.vue = new Vue({
  router,
  store,
  Axios,
  render: h => h(App)
}).$mount('#app')
