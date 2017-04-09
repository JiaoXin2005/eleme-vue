// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router'
import filter from './common/js/filter'

import './common/scss/index.scss'

Object.keys(filter).forEach((key,index,arr) => { // Object.keys返回遍历的key数组
    Vue.filter(key,filter[key]);
})

Vue.config.productionTip = false
Vue.prototype.$axios = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

