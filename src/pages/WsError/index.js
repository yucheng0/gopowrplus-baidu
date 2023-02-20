
import React, { useRef, useEffect, useState } from 'react';
import { Row, Col, Modal } from 'antd';
import { MAIN_COLOR } from '@/constants'
import { useNavigate } from '@umijs/max';

export default function P404() {

  const navigate = useNavigate();
  const reference = useRef();
  const [c, setC] = useState('red');
  const [w, setW] = useState('300px')

  const changeColor = () => {
    setC('yellow');
    setW('100px');
  };

  const style0 = {
    cc: {
      backgroundColor: `${c}`, width: `${w}`
    }
  }
  const [t, setT] = useState(0)

  useEffect(() => {
    const root = document.documentElement;

    // console.log(window.)

  }, [])

  const style1 = {
    body: {
      backgroundColor: "yellow"
    }
  }

  const backToHomePage = () => {
    navigate('/Login', { replace: true });
  }

  // 功能：取得目前的螢幕大小
  const [screenWidth, setScreenWidth] = useState(screen.width)
  const [screenHeight, setScreenHeight] = useState(screen.height)
  const [times, setTimes] = useState(screen.width / 1920)
  // let times = screen.width / 1920
  //建立一個監聽器去監聽螢幕大小發生變化
  window.addEventListener('resize', () => {
    setScreenWidth(screen.width)
    setScreenHeight(screen.Height)
    setTimes(screen.width / 1920)
  })

  return (
    <div
      // className = {styles.center}
      style={{
        textAlign: 'center',
        lineHeight: '10px',
        backgroundColor: 'white',
        width: '320px',
        height: '240px',
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: MAIN_COLOR
      }}
    >
      {console.log(times)}
      <div style={{ position: 'relative', top: `${45}px`, fontSize: `${40 }px`, color:'orange' }}>網路錯誤 !!!</div>

      <hr style={{ position: 'relative', top: `${90}px`, color: MAIN_COLOR , margin:'0 10px 0 10px' }} />

      <div style={{ position: 'relative', top: `${145}px`, fontSize: `${20 }px` }} > <h3> 無法連接 WebSocket  </h3></div>
     </div>
  );
}
