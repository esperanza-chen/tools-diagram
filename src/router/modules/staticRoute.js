const staticRoute = [
  {
    path: '/addnewpage', //组件化任务流程
    component: () => import('@/components/base/index.vue'),
    meta: {
      title: '组件化任务流程-添加流程', //标题
      requiresAuth: false, //是否需要登录
    },
  },
  {
    path: '/', //路由
    redirect: '/home', //重定向
    component: () => import('@/views/home1CreateEdit.vue'),
    meta: {
      title: '首页', //标题
      requiresAuth: false, //是否需要登录
    },
  },
  {//新建编辑
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home1CreateEdit.vue'),
    meta: {
      title: '首页',
      requiresAuth: false,
    },
  },
  {//任务查看
    path: '/watchhome',
    name: 'Watchome',
    component: () => import('@/views/home2TaskQuery.vue'),
    meta: {
      title: '首页2',
      requiresAuth: false,
    },
  },
  {//流程查看
    path: '/showhome',
    name: 'Showhome',
    component: () => import('@/views/home3FlowQuery.vue'),
    meta: {
      title: '首页3',
      requiresAuth: false,
    },
  },
  {//新建流程任务
    path: '/createhome',
    name: 'Createhome',
    component: () => import('@/views/home4CreateFlowTask.vue'),
    meta: {
      title: '首页4',
      requiresAuth: false,
    },
  },
];
export default staticRoute;
