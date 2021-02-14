import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

const Todos = () => import('@/components/Todo.vue');
const Login = () => import('@/components/Login.vue');
const Signup = () => import('@/components/Signup.vue');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'todos',
    component: Todos,
    meta: {
      requiredAuthentication: true,
      roles: ['admin', 'user'],
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      requiredAuthentication: false,
    },
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup,
    meta: {
      requiredAuthentication: false,
    },
  },
];

const router = new VueRouter({
  mode: 'hash',
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiredAuthentication && !store.getters['auth/authenticated']) {
    next({ name: 'login' });
  } else {
    next();
  }
});

Vue.$router = router;

export default router;
