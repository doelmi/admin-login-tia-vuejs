import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "bootstrap-vue/dist/bootstrap-vue.css"
import "bootstrap-vue/dist/bootstrap-vue.min.js"
import router from './router'

Vue.use(BootstrapVue)

new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
