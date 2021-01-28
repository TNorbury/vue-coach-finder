import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import CoachDetails from './pages/CoachDetails.vue';
import CoachRegistration from './pages/CoachRegistration.vue';
import RequestsReceived from './pages/RequestsReceived.vue';
import ContactCoach from './pages/ContactCoach.vue';
import UserAuth from "./pages/auth/UserAuth.vue"

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: null, redirect: '/coaches' },
    { path: '/coaches', component: CoachesList },
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      children: [
        {
          path: 'contact',
          component: ContactCoach,
          props: true
        }
      ]
    },
    { path: "/auth", component: UserAuth },
    { path: '/register', component: CoachRegistration },
    { path: '/requests', component: RequestsReceived },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
