
import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  //首页
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    meta: {title: '首页'},
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/userMana',
    component: Layout,
    redirect: '/userMana/user',
    name: 'userMana',
    meta: {title: '用户管理', icon: 'user'},
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/userMana/user/index'),
        meta: {title: '管理者管理', icon: 'el-icon-user-solid'},
        children: [
          {
            path: 'info',
            name: '用户列表',
            component: () => import('@/views/userMana/user/info'),
            meta: { title: '用户列表', icon: 'table' }
          },
          {
            path: 'save',
            name: '添加用户',
            component: () => import('@/views/userMana/user/save/index'),
            meta: { title: '添加用户', icon: 'form' }
          },
          {
            path: 'edit/:id',
            name: '用户修改',
            component: () => import('@/views/userMana/user/update/index'),
            meta: {title: '用户修改', icon: 'form'},
            hidden: true
          }
        ]
      },
      {
        path: 'student',
        name: 'student',
        component: () => import('@/views/userMana/student/index'),
        meta: {title: '学生管理', icon: 'el-icon-user-solid'},
        children: [
          {
            path: 'info',
            name: '学生列表',
            component: () => import('@/views/userMana/student/info'),
            meta: { title: '学生列表', icon: 'table' }
          },
          {
            path: 'save',
            name: '添加学生',
            component: () => import('@/views/userMana/student/save'),
            meta: { title: '添加学生', icon: 'form' }
          },
          {
            path: 'edit/:id',
            name: '学生修改',
            component: () => import('@/views/userMana/student/update'),
            meta: {title: '学生修改', icon: 'form'},
            hidden: true
          },
          {
            path: '申请审批',
            name: '申请审批',
            component: () => import('@/views/userMana/student/approval'),
            meta: {title: '申请审批', icon: 'form'},
            children: [
              {
                path: '双学位申请审批',
                name: '双学位申请审批',
                component: () => import('@/views/userMana/student/approval/doubleDegree'),
                meta: {title: '双学位申请审批', icon: 'form'},
              },
              {
                path: '重新提交申请审批',
                name: '重新提交申请审批',
                component: () => import('@/views/userMana/student/approval/reSubmit'),
                meta: {title: '重新提交申请审批', icon: 'form'},
              }
            ]
          }
        ]
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
