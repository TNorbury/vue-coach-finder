import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/CoachesList.vue';
import CoachDetails from './pages/CoachDetails.vue';
import CoachRegistration from './pages/CoachRegistration.vue';
import RequestsReceived from './pages/RequestsReceived.vue';
import ContactCoach from './pages/ContactCoach.vue';
import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';

import store from './store/index.js';

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
    { path: '/auth', component: UserAuth, meta: { requiresUnAuth: true } },
    {
      path: '/register',
      component: CoachRegistration,
      meta: { requiresAuth: true, noCoach: true }
    },
    {
      path: '/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true }
    },
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

router.beforeEach(function(to, from, next) {
  // If route requires authentication, and we're not authenticated, redirect
  // to the auth page.
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/auth?mustAuth');
  }
  // If we're authenticated, and the routes requires us to not be authenticated
  // OR requires us to not be a coach, then we'll redirect to the coaches page
  else if (
    store.getters.isAuthenticated &&
    (to.meta.requiresUnAuth || (to.meta.noCoach && store.getters.isCoach))
  ) {
    next('/coaches');
  }
  // Otherwise, let 'em pass
  else {
    next();
  }
});

export default router;
