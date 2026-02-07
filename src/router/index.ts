import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 配置路由
const aboutRouter: RouteRecordRaw = {
    path: '/about',
    name: 'About',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: [],
}

const routes: Array<RouteRecordRaw> = [];
const modules: Record<string, any> = import.meta.glob('./modules/*.ts', {
    eager: true,
});
Object.keys(modules).forEach((key) => {
    routes.push(modules[key].default)
})
routes.push(aboutRouter);
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
console.log('----routes2-----', routes)
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    next()
});

router.afterEach((_to) => {
    NProgress.done();
});

export default router;