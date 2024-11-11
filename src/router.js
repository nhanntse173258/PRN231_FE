import { createMemoryHistory, createRouter } from 'vue-router'

import Home from './Home.vue'
import Adopt from './Adopt.vue'
import Login from './Login.vue';
import Register from './Register.vue';
import AdoptApplication from './SendApplication.vue';
import CatProfile from './components/CatProfile.vue';
import CreateCat from './CreateCat.vue';
import CreateAppointment from './CreateAppointment.vue';
import CreateCatProfile from './CreateCatProfile.vue';
import AddContract from './AddContract.vue';
import ViewApplications from './ViewApplication.vue';
import MyApplication from './MyApplication.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/adopt', component: Adopt },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/adopt/application/send/:id', component: AdoptApplication },
  { path: '/adopt/application/', component: ViewApplications },
  { path: '/adopt/application/user/:id', component: MyApplication, props: true },
  { path: '/cat-profile/:catId', component: CatProfile, props: true },
  { path: '/cat-profile/create/:id', component: CreateCatProfile, props: true},
  { path: '/cat/create', component: CreateCat },
  { path: '/appointment/create', component: CreateAppointment },
  { path: '/contract/create', component: AddContract },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});
export default router;