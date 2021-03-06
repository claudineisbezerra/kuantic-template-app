import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import './assets/scss/vendors/bootstrap/custom.scss';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import io from 'socket.io-client';
import setAuthToken from './utils/authToken';
import moment from 'moment';
/** Internationalization in client-side*/
import i18n from './plugins/i18n';
import FlagIcon from 'vue-flag-icon';
import VueTypedJs from 'vue-typed-js';

Vue.use(BootstrapVue);
Vue.use(FlagIcon);
Vue.use(VueTypedJs);
Vue.config.productionTip = false;
Vue.config.ignoredElements = ['ion-icons', /^ion-/];

moment.locale('pt');
Vue.prototype.moment = moment;

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let socket = null;
/** Socket IO Client - Store in Vuex State for use in components */
if (process.env.NODE_ENV === 'development') {
  socket = io('http://localhost:5000');
} else {
  socket = io('/');
}

store.dispatch('assignSocket', socket);

/** Check for auth token on refresh and set authorization header for incoming requests */
if (localStorage.authToken) {
  setAuthToken(localStorage.authToken);
} else {
  setAuthToken(null);
}

/** Axios Request Intercept */
axios.interceptors.request.use(
  function(config) {
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(err) {
    if (err.response.status === 401) {
      localStorage.removeItem('authToken');
      store.dispatch('toggleAuthState', false);
      router.push({
        name: 'Login',
        params: { message: 'Session has expired, please login again' }
      });
    }
    return Promise.reject(err);
  }
);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app');
