import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AuthService from "@/js/SecurityService";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
    {
        path: '/callback',
        name: 'Callback',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/Callback.vue')
        }
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const authService = AuthService.createInstance();

router.beforeEach(async (to, from, next) => {
    if (to.path !== "/callback") {
        try {
            const token = await authService.getAccessToken();
            if (token) {
                localStorage.setItem("auth_token", token);
                next();
            }
            // await authService.signInCallback();
        } catch(error) {
            //await authService.signIn();
        }
    } else {
        next();
    }
});

export default router
