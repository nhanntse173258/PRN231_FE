import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './Home.vue'
import Adopt from './Adopt.vue'
import Login from './Login.vue';
import Register from './Register.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/adopt', component: Adopt },
  {path: '/login', component: Login},
  {path: '/register', component: Register},
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;