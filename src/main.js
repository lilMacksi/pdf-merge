import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTransmit from "vue-transmit"

Vue.config.productionTip = false
Vue.config.ignoredElements = [/sdx-.+/];

Vue.use(VueTransmit)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
