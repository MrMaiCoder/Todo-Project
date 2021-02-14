import '@/plugins/firebase';
import store from '@/store';
import router from '@/router';
import Vue from 'vue';
import firebase from 'firebase/app';
import vuetify from './plugins/vuetify';
import App from './App.vue';
import 'firebase/auth';

Vue.config.productionTip = false;

let app;
firebase.auth().onAuthStateChanged((user) => {
  store.dispatch('auth/setAuthenticatedUser', user);
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
