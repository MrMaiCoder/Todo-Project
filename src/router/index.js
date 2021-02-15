import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from '@/plugins/firebase';

const Todos = () => import('@/components/Todo.vue');
const Login = () => import('@/components/Login.vue');
const Signup = () => import('@/components/Signup.vue');
const TaskDetails = () => import('@/components/TaskDetails');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'todos',
    component: Todos,
    children: [
      {
        path: 'task/:taskId',
        components: { TaskDetails },
        name: 'TaskDetails',
      },
    ],
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
  mode: 'history',
  routes,
  base: '/',
});

router.beforeEach(async (to, from, next) => {
  const requiresLogin = to.matched.some((record) => record.meta.requiredAuthentication);
  if (requiresLogin && !await firebase.getCurrentUser()) {
    next('login');
  } else if (!requiresLogin && await firebase.getCurrentUser()) {
    next('todos');
  } else {
    next();
  }
});

Vue.$router = router;

export default router;
