import { Navigate, Outlet, useModel } from 'umi';

export default (props) => {
  const { isLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
  }));

  // console.log (isLogin)
  // const { isLogin } = useAuth();
  // console.log ("warpper isLogin = " ,isLogin)

  if (isLogin) {
    return <Outlet />;
  } else {
    return <Navigate to="/Login" />;
  }
};
