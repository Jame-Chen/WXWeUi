import Vue from 'vue';
import Router from 'vue-router';
import huyue from '../views/huyue.vue';
import postarticle from '../views/postarticle.vue';
Vue.use(Router);
const router = new Router({
  // mode:'history',
  routes: [{
      path: '/index',
      name: 'index',
      meta: {
        title: 'herox',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/index.vue'], resolve)
    },
    {
      path: '/test',
      name: 'test',
      meta: {
        title: 'test',
        auth: false, //需要登录
        keepAlive: false
      },
      component: resolve => require(['@/views/Test.vue'], resolve)
    },
    {
      path: '/',
      name: 'huyue',
      meta: {
        title: '互阅',
        auth: false, //需要登录
        keepAlive: false
      },
      component:huyue// resolve => require(['@/views/huyue.vue'], resolve)
    },
    {
      path: '/postarticle',
      name: 'postarticle',
      meta: {
        title: '发布文章',
        auth: false, //需要登录
        keepAlive: false
      },
      component:postarticle// resolve => require(['@/views/postarticle.vue'], resolve)
    },
  ]
});
/**
 * 路由前置检查
 */
router.beforeEach((to, from, next) => {
  // 合法性校验
  if (to.meta.auth) {
    console.log('into auth');
    next();
  }
  next();
});
router.afterEach(() => {
  // 在即将进入新的页面组件前操作
});
export default router;