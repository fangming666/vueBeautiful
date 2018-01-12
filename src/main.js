// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios";
import store from "./vuex/store";
import 'vue-beauty/package/style/vue-beauty.min.css'
import vueBeauty from 'vue-beauty';
import { Loadmore } from 'mint-ui';
Vue.component(Loadmore.name, Loadmore);
Vue.config.productionTip = false;
Vue.prototype.$axios = axios;

Vue.use(vueBeauty);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
