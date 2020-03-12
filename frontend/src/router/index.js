import Vue from 'vue';
import Router from 'vue-router';
import routes from '@/router/routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
});

export default router;
