import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './Home.vue'
import Adopt from './Adopt.vue'
import Login from './Login.vue';
import Register from './Register.vue';
import AdoptApplication from './AdoptApplication.vue';
import CatProfile from './components/CatProfile.vue';
import CreateCat from './CreateCat.vue';
import CreateAppointment from './CreateAppointment.vue';
import CreateCatProfile from './CreateCatProfile.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/adopt', component: Adopt },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/adopt/application/:id', component: AdoptApplication },
  { path: '/cat-profile/:catId', component: CatProfile, props: true },
  { path: '/cat-profile/create/:id', component: CreateCatProfile, props: true},
  { path: '/cat/create', component: CreateCat },
  { path: '/appointment/create', component: CreateAppointment },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;