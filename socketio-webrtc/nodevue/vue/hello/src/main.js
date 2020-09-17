import Vue from 'vue'
import axios from 'axios'
import lodash from 'lodash'

import App from './App.vue'
import router from './router'
import Global from './components/_global'
import { utils } from '@/utils'

// import HelloWorld from '@/components/HelloWorld'
// Vue.component('HelloWorld', HelloWorld)

Vue.config.productionTip = false

Vue.prototype.$http = axios;
Vue.prototype._ = lodash

Vue.mixin(utils)

export const EventBus = new Vue({
  methods: {
    fromSister(m) {
      EventBus.$emit('fromSister', m)
    }
  }
})

export const AAA = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
