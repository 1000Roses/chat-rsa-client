import Vue from 'vue'
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import chat from "./chat/components/chat"
import rsa from "./rsa/components/rsa"

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
}))


import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  { path: '', component: chat },
  { path: '/rsa', component: rsa }
]

const router = new VueRouter({
  mode: 'history',
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
