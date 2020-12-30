import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import uView from "uview-ui";
Vue.use(uView);

// Vue.prototype.$onLaunched = new Promise(resolve => {
//     Vue.prototype.$isResolve = resolve
// })

import bindUser from './common/bind.js'
Vue.prototype.$bindUser = bindUser

import getOpenid from './common/getOpenid.js'
Vue.prototype.$getOpenid = getOpenid

import getUserInfo from './common/getUserInfo.js'
Vue.prototype.$getUserInfo = getUserInfo

import getSign from './common/integral.js'
Vue.prototype.$getSign = getSign

import getSetting from './common/locations.js'
Vue.prototype.$getSetting = getSetting

import store from '@/store'

let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})

// import httpEnrollInterceptor from '@/common/http.enroll.interceptor.js'
// Vue.use(httpEnrollInterceptor, app)

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
