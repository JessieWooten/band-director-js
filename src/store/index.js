import Vue from 'vue'
import Vuex from 'vuex'
import USER from './modules/user'
import SESSION from './modules/session'
import NETWORK from './modules/network'
import VIEW from './modules/view'

Vue.use(Vuex)

const Store = new Vuex.Store({
  modules:{
      user:USER,
      session: SESSION,
      network: NETWORK,
      view:VIEW
  }
});

export default Store;
