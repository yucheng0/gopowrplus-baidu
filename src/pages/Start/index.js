import { SOCKET_URL } from '@/constants'; // https://yctmake.com:12349
import React, { useEffect, useRef, useState } from 'react';
import { AnimateKeyframes } from 'react-simple-animate';
import { Image } from 'antd';
import useRWD from '@/components/useRWD';
import { useModel, useNavigate } from 'umi';
// 引入樣式
import styles from './index.less';
import sawelllogo from '@/assets/images/sa/sawelllogo.png';
import strartbackground from '@/assets/images/sa/startBackgroundNoLogo.png';
import background from '@/assets/images/sa/background.png';
// 引入antd Icon
import { LoadingOutlined } from '@ant-design/icons';
export default function Start() {
  document.title = 'Start';
  // 判斷是否有進入啟動的頁面
  const { isStart, setIsStart } = useModel('start', (ret) => ({
    isStart: ret.isStart,
    setIsStart: ret.setIsStart,
  }));

  let navigate = useNavigate();
  const [pause, setPause] = useState(true); // 初值時,暫停動畫播放
  const [dsp, setDsp] = useState('hidden');
  const [dsp0, setDsp0] = useState('none');
  const [dsp1, setDsp1] = useState('visible');

  // 針對螢幕尺寸
  const [windowX, setWindowsX] = useState(1920);
  const [windowY, setWindowsY] = useState(1080);
  // 針對元素尺寸
  const [clientX, setClientX] = useState(1920);
  const [clientY, setClientY] = useState(1080);
  const reference = useRef();

  useEffect(() => {
    const t1 = setInterval(() => {
      console.log('校正螢幕')
      z();
      // setDsp('visible')
    }, 1000); // 太短會有問題（因為html未載入時它是, 5sec更新一次, 太長位置跑了

    return () => {
      console.log('離開校正螢幕')
      clearInterval(t1);
    };
    //  setState 如果在APP下馬上call 會造成錯誤要注意
    // z(); // 載完之後才會執行這個，而且只會執行一次
  }, []);

  const x = () => {
    setWindowsX(window.innerWidth);
  };
  const y = () => {
    setWindowsY(window.innerHeight);
  };

  function z() {
    // console.log('reference = ', reference)
    // console.log('reference.current = ', reference.current)
    // console.log('reference.current.clientWidth = ', reference.current.clientWidth)

    try {
      if (reference.current !== null) {
        setClientX(reference.current.clientWidth);
        setClientY(reference.current.clientHeight);
      }
    }
    catch (err) {
      console.log('start 取不到clientWidth/clientHeight所發生error', err)
    }

  }

  // const [play, setPlay] = useState(false);

  useEffect(() => {
    const _animated = document.querySelector('.animation');
    //監聽結束
    _animated.addEventListener('animationend', () => {
      console.log('animation ended');
      setIsStart(true);
      // 不可以馬上跳出, 會出問題要等一段時間
      const t2 = setTimeout(() => {
        navigate('/Login', { replace: true });
      }, 100);
    });
    //監聽啟動start
    // _animated.addEventListener('animationstart', () => {
    //   console.log('animation start');
    // });

    // 下面這個監聽至它結束
    // _animated.onAnimationEnd = () => {
    //   console.log('animation ended')
    // }

    // 路由在跳躍時會自己幫你關, 你不用自己關clearTimeout 否則會錯誤
    // return ()=>{
    //   console.log('Ended')
    // }
    // console.log ("hello")
    console.log('window.devicePixelRatio = ', window.devicePixelRatio);
  }, []);

  const gFinish = () => {
    console.log('圖形載入成功');
    //  js 寫 ccs 的格式
    document.body.style.backgroundImage = { strartbackground };
    setDsp0('block');
    //
    setTimeout(() => {
      setDsp('visible');
      setPause(false); // 不暫停就播放
    }, 1000);

    setTimeout(() => {
      setDsp1('hidden');
    }, 500);
  };



  //呼叫螢幕的寬度位置
  useRWD(x, y);

  return (
    <div>
      <h1
        style={{
          position: 'absolute',
          top: '50%',
          left: '49%',
          color: 'white',
          visibility: `${dsp1}`,
        }}
      >
        <LoadingOutlined />
      </h1>

      {/* 偵測圖片下載完畢後, 才執行下一個動作 
最好不要用時間因為你並不會知道網路載入的快慢, 你只會知道狀態
用狀態來做是最好的解答
*/}
      <div style={{ display: 'none' }}>
        <img src={strartbackground} onLoad={gFinish} />
        <img src={background} />
      </div>
      {/* 包一層把整個都隱藏起來 */}
      <div style={{ display: `${dsp0}` }}>
        <div
          ref={reference}
          id="width"
          style={{
            visibility: `${dsp}`,
            width: `${windowX > 602 ? '602px' : '301px'}`,
            // width: 602,
            height: 79,
            marginLeft: (windowX - clientX) / 2,
            marginTop: (windowY - clientY) / 2,
          }}
        >
          <Image
            // width={200}
            src={sawelllogo}
            preview={false}
          />
        </div>

        <div className="animation">
          <AnimateKeyframes
            play={false}
            pause={pause}
            start={{ opacity: 0 }}
            end={{ opacity: 1 }}
            // render={countN}
            // fillMode = "forwards"
            // {...props}
            // 感覺它好像是最後一個
            // sequenceIndex={0}
            duration={1}
            delay={0.3}
            direction="alternate"
            iterationCount={3}
            // onComplete={onCompleteCallBack} // call back function when animation is completed
            // complete={{ display: 'none' }}
            keyframes={['opacity : 0', 'opactiy : 1']}
          >
            {/* { console.log(windowX, windowY)} */}
            <div>
              {/* 取得目前的螢幕尺寸是windowX, windowY */}
              {/* 不是clientX, clinetY 它是元件的尺寸 */}
              {/* {windowX} {windowY} */}

              {/* <div className="triangle"> */}
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderBottom: `${windowY}px solid #84bd00`,
                  // borderBottom: `${windowY}px solid #ff0000`,
                  borderLeft: `${windowX * 0.18}px solid transparent`,
                  // borderRight:`${windowX*0.05}px solid #ff0000`,
                  borderRight: `${windowX * 0.1}px solid #84bd00`,
                  position: 'absolute',
                  right: 0,
                  top: 0,
                }}
              ></div>
            </div>
          </AnimateKeyframes>
        </div>
      </div>
    </div>
  );
}
