import Vue from 'vue';
import App from './App.vue';
import './assets/scss/style.scss';
import { store } from './store';

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  render: h => h(App)
}).$mount('#app')

Vue.directive('focus', {
  // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
  inserted: function (el) {
    // 엘리먼트에 포커스를 줍니다
    el.focus()
  }
})