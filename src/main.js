import Vue from 'vue';
import App from './App.vue';
import VueMoment from 'vue-moment';
import Moment from 'moment-timezone';
import './assets/scss/style.scss';

Vue.config.productionTip = false

Vue.use(VueMoment, {
  Moment,
})

new Vue({
  render: h => h(App)
}).$mount('#app')

Vue.directive('focus', {
  // 바인딩 된 엘리먼트가 DOM에 삽입되었을 때...
  inserted: function (el) {
    // 엘리먼트에 포커스를 줍니다
    el.focus()
  }
})