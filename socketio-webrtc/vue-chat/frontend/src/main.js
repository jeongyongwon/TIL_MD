import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/black-green-light.css'
import Directives from '../plugin/directives'

// 서버와 소켓연결을 위해 사용한 모듈을 import
import io from 'socket.io-client';
// 연결하고자 하는 서버의 url 을 입력
const socket = io('http://localhost:3000');
// socket 을 vue 인스턴스 변수로 등록하여 컴포넌트에서 사용할 수 있도록 함
Vue.prototype.$socket = socket;

Vue.use(VueMaterial)
Vue.use(Directives)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
