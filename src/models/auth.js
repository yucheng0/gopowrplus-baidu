import { useState } from 'react';

export default () => {
  const [isLogin, setIsLogin] = useState(false);
  // const [isLogin, setIsLogin] = useState(true);
  // console.log (isLogin)
  return { isLogin, setIsLogin };
};
