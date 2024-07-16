export default [
  { path: '/', name:'主页',icon: 'smile', component: './Index' },
  { path: '/interface_info/:id', name:'查看接口',icon: 'smile', component: './InterfaceInfo', hideInMenu: true },
  { path: '/user',
    layout: false,
    routes: [{name:'登录', path: '/user/login', component: './User/Login' }] },
  {
    name: '管理员界面',
    path: '/admin',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      { name:'接口管理', icon: 'table', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { path: '/admin', redirect: '/admin/sub-page' },
      { path: '/admin/sub-page', component: './Admin' },
    ],
  },
  { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
