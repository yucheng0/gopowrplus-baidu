import { useState } from 'react';

export default () => {
  const [isStart, setIsStart] = useState(false);
  // const [isLogin, setIsLogin] = useState(true);
  // console.log (isLogin)
  return { isStart, setIsStart };
};
