import React, { useEffect, useState } from 'react';
import { MAIN_COLOR } from '@/constants';
import All3 from '@/assets/images/sa/ALL3.png';
import FanIcon from '@/assets/images/sa/page1icon/fanicon.png';
import Co2Icon from '@/assets/images/sa/page1icon/co2icon.png';
import ElectricIcon from '@/assets/images/sa/page1icon/electricicon.png';
import ElectricIconWithYellow from '@/assets/images/sa/page1icon/electriciconwithyellow.png';
import GasIcon from '@/assets/images/sa/page1icon/gasicon.png';
import LeafIcon from '@/assets/images/sa/page1icon/leaficon.png';
import { Navigate, Outlet, useModel } from 'umi';
import PubSub from 'pubsub-js';

import { LogoutOutlined } from '@ant-design/icons';

import styles from './index.less';
import { Image } from 'antd';
import { io } from 'socket.io-client';

// let global_clubGreen = 0;
// let clubGreen = 0;
// let unitChange = false 
let screenWidth = 1920
let screenHeight = 1080
let times = screenWidth/1920
let duration = {}

export default function Basic1() {
  const [screenWidth, setScreenWidth] = useState(screen.width);
  // const [screenHeight, setScreenHeight] = useState(screen.height);
  // const [times, setTimes] = useState(screen.width / 1920);

   // 它會減少畫面切換時閃一下但是會增加一次渲染
  // const [dsp, setDsp] = useState('none');
  const [dsp, setDsp] = useState('block');

  const [todayGreen, setTodayGreen] = useState(0);
  const [clubGreen, setClubGreen] = useState(0);
  const [globalGreen, setGlobalGreen] = useState(0);

  const [allData, setAllData] = useState();
  const [energy, setEnergy] = useState();

    // 底下這個是advText保留全局用的
    const { advText, setAdvText } = useModel('advtext', (ret) => ({
      advText: ret.advText, // 傳來目前的值
      setAdvText: ret.setAdvText, // 傳來方法
    }));
  
  const [unitChange, setUnitChange] = useState(false)

  console.log('Menu ---> Basic1 - 到底進來幾次', new Date());
  // 全局變數socketio (注意入口一定要走路由login 才會取得到全局)
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  useEffect(() => {
    // setScreenWidth(screen.width);
    // setScreenHeight(screen.height);
    // setTimes(screen.width / 1920); // 以1280px為主去做的

    // screenWidth = screen.width
    screenHeight = screen.height
    times = screen.width / 1920
// 監聽螢幕的變化
    window.addEventListener('resize', () => {
      setScreenWidth(screen.width)
      screenHeight = screen.height
      times = screen.width / 1920
   
    }); 


    const root = document.documentElement;
    // css 變數設定（好用）
    root.style.setProperty('--w', screen.width);
    // 為了解決一開始畫面閃動的問題
    setTimeout(() => {
      setDsp('block'); // ??????????????????? 這個也有問題
    }, 100);
  }, []);



  PubSub.unsubscribe('retClubGetAllFacilityData');
  PubSub.subscribe('retClubGetAllFacilityData', (msg, data) => {
    console.log('msg=', msg); // 解出clubResisterResult
    console.log('data=', data); // 解出真正的data內容
    setGlobalGreen((data.global * 1).toFixed(2));  // 總綠能
    setClubGreen((data.club * 1).toFixed(2));  // 俱樂部的累積綠能
    // global_clubGreen = (data.global * 1).toFixed(2);
  });

    // 取得廣告的文字
  // 一進來就去讀取資料庫的廣告訊息
  // 送出多次的調用
  useEffect(() => {
    const token = localStorage.getItem('saclub_accessToken');
    // 它可以直接送對象不用送token
    console.log('Basic1--->送出clubGetAdvText2 (真正在menu送的人)');
    socketio.emit('clubGetAdvText', JSON.stringify({ saclub_accessToken: token }))
  }, []);

  PubSub.unsubscribe('duration');
  PubSub.subscribe('duration', (msg, data) => {
    duration = data
    console.log('datadata', data)
    // duration = data.duartion;
    console.log('duration', duration)
  });


  // 進來就調用1次
  useEffect(()=>{
        console.log("多次調用????qqqqq",new Date())
      const token = localStorage.getItem('saclub_accessToken');
      let nowTime = new Date();
      let time_zone = nowTime.getTimezoneOffset() / 60 * -1;
  
 
      setUnitChange(unitChange => !unitChange)
      socketio.emit(
        'clubGetAllFacilityData',
        JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
      );
 

  },[])



  // 每10sec調用1次
useEffect(()=>{
  const t2 = setInterval(function () {
    console.log("多次調用????xxxx",new Date())
    const token = localStorage.getItem('saclub_accessToken');
    let nowTime = new Date();
    let time_zone = nowTime.getTimezoneOffset() / 60 * -1;

    // PubSub.unsubscribe('duration');
    // PubSub.subscribe('duration', (msg, data) => {
    //   duration = data
    //   console.log('datadata', data)
    //   // duration = data.duartion;
    //   console.log('duration', duration)
    // });

    setUnitChange(unitChange => !unitChange)
    socketio.emit(
      'clubGetAllFacilityData',
      JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
    );
  }, 10000)
  return ()=>{
    console.log ('離開了t2')
     clearInterval(t2)
    // socketio.off('clubGetAllFacilityData') //?????????????
  }
},[])
  


  return (
    // 最外層包起來  710-55 = 655
    <div style={{ display: `${dsp}` }}>
      {console.log('basic width = ', screenWidth)}
      <div
        className={styles.boxin}
        style={{
          width: `${screenWidth-63}px`,
          height: `${screenHeight - 150}px`,
        }}
      >
        {/* 自己圖片尺寸的要告訴流灠器 */}
        <Image src={All3} width={'100%'} height={'100%'} preview={false} />
        <div
          style={{
            position: 'absolute',
            top: '3%',
            left: '6%',
            fontSize: `${67.5 * times}px`,
            color: MAIN_COLOR,
            letterSpacing: `${10.5 * times}px`,
          }}
        >
          YOU′VE&nbsp;IMPROVED
        </div>
        {/* <div style={{ position:'absolute',top:'5%',left:'4%', fontSize:`${50*1.7}px`,color:MAIN_COLOR, letterSpacing:7}}>  YOU′VE&nbsp;IMPROVED</div>  */}
        {/* <div style={{ position:'absolute',top:'5%',left:'4%', fontSize:'4vw',color:MAIN_COLOR, letterSpacing:'0.7vw'}}>  YOU′VE&nbsp;IMPROVED</div>  */}

        <div
          style={{
            position: 'absolute',
            top: '9%',
            left: '4%',
            fontSize: `${70 * 1.5 * times}px`,
            letterSpacing: `${18 * 1.5 * times}px`,
          }}
        >
          THE&nbsp;WORLD
        </div>
        {/* <div style={{ position:'absolute',top:'11%',left:'4%', fontSize:'5.6vw', letterSpacing:'1.6vw'}}>  THE&nbsp;WORLD</div> */}
        <div
          style={{
            position: 'absolute',
            top: '23.2%',
            left: '22.4%',
            fontSize: `${30 * times}px`,
          }}
        >
          WITH
        </div>
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '12%',
            fontSize: `${50 * 1.5 * times}px`,
          }}
        >
          ECO&nbsp;POWR
        </div>

        {/* 葉子 */}
        <div
          style={{
            position: 'absolute',
            top: '47%',
            left: '5%',
            fontSize: `${40 * 1.5 * times}px`,
          }}
        >
          <Image
            src={LeafIcon}
            width={100 * times}
            height={100 * times}
            preview={false}
          />
        </div>

        {/*Total Green Energy Gernerated  */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '12%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          Total&nbsp;Green&nbsp;Energy&nbsp;Generated
        </div>
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '12%',
            fontSize: `${50 * 1.5 * times}px`,
            color: MAIN_COLOR,
            letterSpacing: `${10 * 1.5 * times}px`,
          }}
        >
          {clubGreen}
        </div>
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '32.5%',
            display: 'block',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          watts/hour
        </div>
        {/* 全球綠能產生 */}
        <div
          style={{
            position: 'absolute',
            top: '78%',
            left: '5%',
            display: 'block',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          全球綠能產生：
          <span style={{ color: MAIN_COLOR }}>{globalGreen}</span>
          <span>&nbsp;瓦時</span>
        </div>

        {/* sourced */}
        <div
          style={{
            position: 'absolute',
            top: '85%',
            left: '5%',
            display: 'block',
            fontSize: `${15 * 1.5 * times}px`,
          }}
        >
          sourced from www.EPA.gov
        </div>

        {/* 電風扇 */}
        <div
          className={styles.fanicon}
          style={{
            position: 'absolute',
            top: '4%',
            left: '53%',
            // width:'150px',
            // height:'150px',
            // backgroundColor:'red',

            // fontSize: `${30 * times}px`,
          }}
        >
          <Image
            src={FanIcon}
            preview={false}
            width={150 * times}
            height={150 * times}
          ></Image>
        </div>
        <div
          style={{
            position: 'absolute',
            top: '11.05%',
            left: '55.45%',
            color: 'red',
            // fontSize: `${30 * times}px`,
          }}
        >
          .
        </div>

        <div
          style={{
            position: 'absolute',
            top: '4%',
            left: '63%',
            fontSize: `${35 * 1.5 * times}px`,
            letterSpacing: `${3 * 1.5 * times}px`,
          }}
        >
          電風扇使用時間
        </div>

        {/* 電風扇使用時間數字 */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            left: '63%',
            fontSize: `${35 * 1.5 * times}px`,
            letterSpacing: `${3 * 1.5 * times}px`,
          }}
        >
          {(clubGreen / 10).toFixed(2)} &nbsp;小時
        </div>

        {/* 汔油節省Icon */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '54%',
            // fontSize: `${30 * times}px`,
          }}
        >
          <Image
            src={GasIcon}
            width={120 * times}
            height={120 * times}
            preview={false}
          />
        </div>

        {/* 汔油節省 */}
        <div
          style={{
            position: 'absolute',
            top: '26%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          汔油節省
        </div>

        {/* 汔油節省數字 */}
        <div
          style={{
            position: 'absolute',
            top: '33%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
        {unitChange === false ?
         `${(clubGreen / 13500).toFixed(2)} 加侖`
        : 
          `${(clubGreen /13500 *  3.785).toFixed(2)} 公升`
        }

{/* &nbsp;加侖 */}
        </div>

        {/* 二氧化碳排放量減少Icon */}
        <div
          className={styles.co2icon}
          style={{
            position: 'absolute',
            top: '48%',
            left: '54%',
            // fontSize: `${30 * times}px`,
          }}
        >
          <Image
            src={Co2Icon}
            width={120 * times}
            height={120 * times}
            preview={false}
          />
        </div>

        {/* 二氧化碳排放量減少 */}
        <div
          style={{
            position: 'absolute',
            top: '48%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          二氧化碳排放量減少
        </div>
        {/* 二氧化碳排放量減少數據*/}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          {(clubGreen * 0.75).toFixed(2)}&nbsp;公克
        </div>

        {/* 電燈泡使用時間 */}
        <div
          className={styles.electricicon}
          style={{
            position: 'absolute',
            top: '71%',
            left: '54%',
            zIndex: 10,
            opacity: 0.5,
          }}
        >
          <Image
            src={ElectricIcon}
            width={110 * times}
            height={130 * times}
            preview={false}
          />
        </div>

        {/* 電燈泡使用時間icon with yellow */}
        <div
          style={{
            position: 'absolute',
            top: '71%',
            left: '54%',
            // left: '64%',
            zIndex: 9,
            opacity: 1,
          }}
        >
          <Image
            src={ElectricIconWithYellow}
            width={110 * times}
            height={130 * times}
            preview={false}
          />
        </div>

        {/* 電燈泡使用時間 */}
        <div
          style={{
            position: 'absolute',
            top: '70%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          電燈泡使用時間
        </div>

        {/* 電燈泡使用時間*/}
        <div
          style={{
            position: 'absolute',
            top: '78%',
            left: '63%',
            fontSize: `${30 * 1.5 * times}px`,
          }}
        >
          {(clubGreen / 5).toFixed(2)}&nbsp;小時
        </div>

        {/* 流動字串 */}

        <div
          className={styles.marquee}
          style={{
            //  position: 'absolute',
            // top: '91%',
            //  left: '0%',
            fontSize: `${35 * 1.5 * times}px`,
            //  backgroundColor: 'yellow',
          }}
        >
          <p>{advText}</p>
        </div>
        {/* <div>  {energy} </div> */}
        {/* <div> 你好我的資料如下 {allData} </div>
        <div> 你好我的資料如下 {allData} </div> */}
      </div>
    </div>
  );
}
