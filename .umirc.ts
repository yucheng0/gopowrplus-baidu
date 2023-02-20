import { defineConfig } from '@umijs/max';
import { triggerFocus } from 'antd/lib/input/Input';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  // title:'',
  request: {},
  locale: {
    // 默认使用 src/locales/zh-CN.ts 作为多语言文件
    default: 'zh-CN',
    baseSeparator: '-',
    // title: true,   // 開啟標題國際化
    // antd: true,
  },

  layout: {
    // title: '@umijs/max',   這個在在頁面顯示時多出現的文字
    title: 'SportsArt',
    // locale:true,
  },

  theme: {
    // 全局主色
    '@primary-color': '#84bd00',
  },

  routes: [
    {
      path: '/',
      redirect: '/Start',
    },
    // layout 的範例
    {
      name: 'Home',
      path: '/home',
      component: '@/layouts/home',
      // routes: [{ path: '/home', component: './Home' }],
      routes: [{ path: '/home', component: './Home' }],
    },

    {
      name: 'Temp',
      path: '/temp',
      component: './Temp',
    },
    // {
    //   name: 'Basic',
    //   path: '/basic',
    //   component: './Basic',
    // },
    {
      name: 'Menu',
      path: '/menu',
      component: './Menu',
      label: 'Menu',
      wrappers: ['@/wrappers/auth'],
    },

    {
      name: 'Login',
      path: '/login',
      component: './Login',
      label: 'Login',
    },

    {
      name: 'Start',
      path: '/Start',
      component: './Start',
      label: 'Start',

      // component: '@/layouts/login',
      // routes: [{ path: '/login', component: './Login' }],

      headerRender: false,
      footerRender: false,
      // // 上面的logo, 名稱不見了
      menuHeaderRender: false,
      // // menu 全部關閉
      menuRender: false,
    },

    {
      name: '註冊',
      path: '/register',
      component: './Register',
      // wrappers: ['@/wrappers/auth'],
    },

    {
      name: 'T1',
      path: '/t1',
      component: './T1',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      name: 'WS錯誤',
      path: '/wserror',
      component: './WsError',
      // wrappers: ['@/wrappers/auth'],
    },


    {
      name: '忘記密碼',
      path: '/forgot',
      component: './Forgot',
      // wrappers: ['@/wrappers/auth'],
    },


    {
      name: 'TermsOfService',
      path: '/termsofservice',
      component: './TermsOfService',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      name: 'PrivacyPolicy',
      path: '/privacypolicy',
      component: './PrivacyPolicy',
      // wrappers: ['@/wrappers/auth'],
    },
    {
      name: '固定頭部導航',
      path: '/fixheader',
      component: './Fixheader',
      headerRender: false,
      footerRender: false,
      // 上面的logo, 名稱不見了
      menuHeaderRender: false,
      // menu 全部關閉
      menuRender: false,
    },
    {
      name: '权限演示',
      path: '/access',
      component: './Access',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },

    {
      name: ' tools',
      path: '/tools',
      component: './Tools',
    },

    {
      name: '404',
      path: '*',
      component: './404',
    },
  ],
  npmClient: 'yarn',
});
