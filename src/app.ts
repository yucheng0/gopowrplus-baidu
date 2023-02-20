// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: '' };
}

export const layout = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
      // locale: true,
    },
    // 設定導航列在上方
    layout: 'top', // top | side | mix
    // 刪除所有自帶的界面
    pure: true,
    // 路由, 麵包屑關閉
    // route:'',
  };
};
