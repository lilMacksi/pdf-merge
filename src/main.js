import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueTransmit from "vue-transmit"
import { defineCustomElements } from "@swisscom/sdx/dist/js/webcomponents/loader";
import '@swisscom/sdx/dist/css/webcomponents.css'

Vue.config.productionTip = false
Vue.config.ignoredElements = [/sdx-.+/];

defineCustomElements();

Vue.use(VueTransmit)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
