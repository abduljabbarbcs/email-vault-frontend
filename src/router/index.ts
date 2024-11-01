import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'signup',
    component: () => import('../pages/Index.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../pages/About.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('../pages/SignUp.vue')
  },
  {
    path: '/add-billing-method',
    name: 'AddBillingMethod',
    component: () => import('../pages/AddBillingMethod.vue')
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: () => import('../pages/ResetPassword.vue')
  },
  {
    path: '/email-verification',
    name: 'EmailVerification',
    component: () => import('../pages/EmailVerification.vue')
  },
  {
    path: '/verify-email',
    name: 'VerifyEmail',
    component: () => import('../pages/VerifyEmail.vue')
  },

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
