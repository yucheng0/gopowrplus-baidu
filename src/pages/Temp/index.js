import React, { useState, useEffect } from 'react';
import { MAIN_COLOR } from '@/constants';
import All3 from '@/assets/images/sa/ALL3.png';
// import styles from './index.less';
import './index.less';

import { Image } from 'antd';
import { transform } from 'typescript';

export default function Basic1() {
  // document.title = "test...."

  const [screenW, setScreenW] = useState(window.innerWidth);
  const [screenH, setScreenH] = useState(window.innerHeight);
  const [windowW, setWindowW] = useState(0);
  const [windowH, setWindowH] = useState(0);

  const [pageW, setPageW] = useState(0);
  const [pageH, setPageH] = useState(0);

  const [scaleX, setScaleX] = useState(1);
  const [scaleY, setScaleY] = useState(1);

  useEffect(() => {
    const t1 = setInterval(() => {
      //
      setWindowW(window.innerWidth);
      setWindowH(window.innerHeight);
      //
      setPageW(document.documentElement.scrollWidth);
      setPageH(document.documentElement.scrollHeight);
      //  screenWidth = screen.width;
      //  screenHeight = screen.height;
    }, 2000);

    setScreenW(screen.width);
    setScreenH(screen.height);

    return () => {
      clearInterval(t1)
    }
  }, []);

  //   document
  //     .querySelector('meta')
  //     .setAttribute("name", "viewport")
  //     // .setAttribute("content","width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"

  // document
  // .querySelector('meta')
  // .setAttribute("content","width=device-width,initial-scale=3.0,maximum-scale=3.0,user-scalable=no")

  // console.log(document
  //   .querySelector('meta')
  // )

  // /*
  // <meta name="viewport" content="width=device-width,
  //                                      initial-scale=1.0,
  //                                      maximum-scale=1.0,
  //                                      user-scalable=no">

  // */

  //     console.log(document
  //       .querySelector('meta')
  //     )

  return (
    // 最外層包起來

    // <div className="box-in" style={{width:`${screenW-100}px`, height:`${screenH}px`}}>
    <div className="box-in" style={{ width: '1270px', height: '710px', padding: '5px' }}>
      <Image src={All3} width={'100%'} height={'100%'} preview={false} />
      <div className="box1">
        Screen = {screenW} {screenH}
      </div>
      <div className="box2">
        page.scroll = {pageW} {pageH}
      </div>
      <div className="box3">
        window.inner = {windowW} {windowH}
      </div>


    </div>
  );
}
