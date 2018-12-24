import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';

Vue.config.productionTip = false;
Vue.prototype.$axios=axios;

new Vue({
  render: function (h) { return h(App) },
}).$mount('#app')
