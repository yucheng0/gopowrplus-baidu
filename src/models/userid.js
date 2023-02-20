import { useState } from 'react';

export default () => {
  const [userId, setUserId] = useState('user');
  // const [isLogin, setIsLogin] = useState(true);
  // console.log (isLogin)
  return { userId, setUserId };
};
