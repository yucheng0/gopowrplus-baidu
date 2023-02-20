import React, { useEffect, useState } from 'react';
import { MAIN_COLOR } from '@/constants';
import All3 from '@/assets/images/sa/ALL3.png';
import FanIcon from '@/assets/images/sa/page1icon/fanicon.png'
import Co2Icon from '@/assets/images/sa/page1icon/co2icon.png'
import ElectricIcon from '@/assets/images/sa/page1icon/electricicon.png'
import ElectricIconWithYellow from '@/assets/images/sa/page1icon/electriciconwithyellow.png'
import GasIcon from '@/assets/images/sa/page1icon/gasicon.png'
import LeafIcon from '@/assets/images/sa/page1icon/leaficon.png'

import styles from './index.less';
import { Image } from 'antd';

export default function Basic1() {
  const [screenWidth, setScreenWidth] = useState(0);
  const [screenHeight, setScreenHeight] = useState(0);
  const [times, setTimes] = useState(1);

  useEffect(() => {
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
    setTimes(screen.width / 1280); // 以1280px為主去做的
  }, []);
  return (
    // 最外層包起來  710-55 = 655
    <div>
      <div
        className={styles.boxin}
        style={{
          width: `${screenWidth }px`,
          height: `${screenHeight - 63}px`,
        }}
      >
        {/* 自己圖片尺寸的要告訴流灠器 */}
        <Image src={All3} width={'100%'} height={'100%'} preview={false} />
        <div
          style={{
            position: 'absolute',
            top: '3%',
            left: '6%',
            fontSize: `${45 * times}px`,
            color: MAIN_COLOR,
            letterSpacing: `${7 * times}px`,
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
            fontSize: `${70 * times}px`,
            letterSpacing: `${18 * times}px`,
          }}
        >
          THE&nbsp;WORLD
        </div>
        {/* <div style={{ position:'absolute',top:'11%',left:'4%', fontSize:'5.6vw', letterSpacing:'1.6vw'}}>  THE&nbsp;WORLD</div> */}
        <div style={{ position: 'absolute', top: '23.8%', left: '22.4%' }}>
          WITH
        </div>
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '12%',
            fontSize: `${50 * times}px`,
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
            fontSize: `${40 * times}px`,
          }}
        >
          <Image src={LeafIcon} width={'100px'} height={'100px'} preview={false} />
        </div>


        {/*Total Green Energy Gernerated  */}
        <div
          style={{
            position: 'absolute',
            top: '45%',
            left: '12%',
            fontSize: `${30 * times}px`,
          }}
        >
          Total&nbsp;Green&nbsp;Energy&nbsp;Generated
        </div>
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '12%',
            fontSize: `${50 * times}px`,
            color: MAIN_COLOR,
            letterSpacing: `${10 * times}px`,
          }}
        >
          400,000
        </div>
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: '32.5%',
            display: 'block',
            fontSize: `${30 * times}px`,
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
            fontSize: `${30 * times}px`,
          }}
        >
          全球綠能產生：<span style={{color:MAIN_COLOR}}>9,852,350</span><span>&nbsp;瓦時</span>
        </div>

{/* sourced */}
<div
          style={{
            position: 'absolute',
            top: '85%',
            left: '5%',
            display: 'block',
            fontSize: `${15 * times}px`,
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
        <Image src={FanIcon} preview={false} width={'150px'} height={'150px'}> </Image>
        </div>
<div
  style={{
    position: 'absolute',
    top: '11.05%',
    left: '55.45%',
    color:'red'
    // fontSize: `${30 * times}px`,
  }}>
.
</div>


<div
          style={{
            position: 'absolute',
            top: '4%',
            left: '63%',
            fontSize: `${35 * times}px`,
            letterSpacing:`${3 * times}px`
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
        fontSize: `${35 * times}px`,
        letterSpacing:`${3 * times}px`
      }}>  

60,138&nbsp;小時
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
          <Image src={GasIcon} width={'120px'} height={'120px'} preview={false}/>
        </div>

{/* 汔油節省 */}
<div
          style={{
            position: 'absolute',
            top: '26%',
            left: '63%',
            fontSize: `${30 * times}px`,
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
        fontSize: `${30 * times}px`,
      }}>  

44.56&nbsp;加侖
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
          <Image src={Co2Icon} width={'120px'} height={'120px'} preview={false} />
        </div>





{/* 二氧化碳排放量減少 */}
<div
          style={{
            position: 'absolute',
            top: '48%',
            left: '63%',
            fontSize: `${30 * times}px`,
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
        fontSize: `${30 * times}px`,
      }}>  

44.56&nbsp;公克
</div>


{/* 電燈泡使用時間 */}
<div
className={styles.electricicon}
          style={{
            position: 'absolute',
            top: '71%',
            left: '54%',
            zIndex:10,
            opacity:0.5,
          }}
        >
          <Image src={ElectricIcon} width={'110px'} height={'130px'} preview={false} />
        </div>

{/* 電燈泡使用時間icon with yellow */}
<div

          style={{
            position: 'absolute',
            top: '71%',
            left:'54%',
            // left: '64%',
            zIndex:9,
            opacity:1,
          }}
        >
          <Image src={ElectricIconWithYellow} width={'110px'} height={'130px'} preview={false} />
        </div>


{/* 電燈泡使用時間 */}
<div
          style={{
            position: 'absolute',
            top: '70%',
            left: '63%',
            fontSize: `${30 * times}px`,
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
        fontSize: `${30 * times}px`,
      }}>  

44.56&nbsp;小時
</div>




        {/* 流動字串 */}

        <div
          className={styles.marquee}
         style={{
          //  position: 'absolute',
          // top: '91%',
          //  left: '0%',
             fontSize: `${35 * times}px`,
          //  backgroundColor: 'yellow',
           }}
        >
          <p>歡迎光臨力伽實業股份有限公司....Welcome to SportArt....欢迎光临时宝雅...</p>
        </div>
      </div>
    </div>
  );
}
