// import React , {useEffect} from 'react'
import { useEffect, useState } from 'react';
import { useModel } from 'umi';
import { useNavigate } from '@umijs/max';

export default function Logout() {
  const navigate = useNavigate();
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  useEffect(() => {
    console.log('logout 跳回來');
    setIsLogin(false);
    localStorage.removeItem('saclub_accessToken');
    setTimeout(() => {
      // 把ioSocket連線斷了它嗎？ (真的可以砍)
    //  socketio.disconnect();

      navigate('/Login', { replace: true });
    }, 100);
  }, []);

  return <div></div>;
}
