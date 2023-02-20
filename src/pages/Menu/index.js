import { nanoid } from 'nanoid';
import { useNavigate } from '@umijs/max';
import { Button, Layout, Menu, Image, Row, Col } from 'antd';
import { useModel, Outlet } from 'umi';
import { useState, useEffect, useRef } from 'react';
const { Header, Content, Footer } = Layout;
// 組件引入
import Basic1 from '@/components/Basic1'; // key=0
import Basic2 from '@/components/Basic2'; // key= 1
import Main from '@/components/Main'; //2
import Management from '@/components/Management'; //3
import Error from '@/components/error.js'; //4
import Maintain from '@/components/maintain.js'; //5
import Rank from '@/components/Rank'; //6
import Competition from '@/components/competition.js'; //7
import Contact from '@/components/Contact'; //7
import About from '@/components/About'; //7

import Advertisement from '@/components/Advertisement'; //8
import Settings from '@/components/Settings'; //8
import Parameters from '@/components/Parameters' // 12
import Logout from '@/components/logout.js'; //13
import PubSub from 'pubsub-js';

// ICON 的引入
import {
  WifiOutlined,
  LeftCircleFilled,
  PieChartOutlined,
  DesktopOutlined,
  LogoutOutlined, //logout
  SettingOutlined, // setting
  MenuOutlined, // 目錄
  QuestionOutlined,
  FullscreenOutlined,
  FullscreenExitOutlined,
} from '@ant-design/icons';
// 圖像的引入
import tinysawelllogo from '@/assets/images/sa/tinysawelllogo.svg';

// 樣式的引入
import styles from './index.less';

/*
#333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色
*/
// 常數的引入
import {
  KEY_BASIC_1,
  KEY_BASIC_2,
  KEY_DATA,
  KEY_ERROR,
  KEY_MANAGE,
  KEY_MAINTAIN,
  KEY_SETTINGS,
  KEY_CLUB_RANK,
  KEY_COMPETITION,
  KEY_LOGOUT,
} from '@/constants';
import {global_globalGreen} from '@/globalvars'

export default function MenuBasic() {
// 全局變數
  console.log ('global_globalGreen',global_globalGreen)

  console.log('Menu 進入')


  // 全局變數socketio (注意入口一定要走路由login 才會取得到全局)
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));


  const [isFull, setIsFull] = useState();


  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [screenHeight, setScreenHeight] = useState(screen.height);
  const [times, setTimes] = useState(screen.width / 1920);
  // const [dsp, setDsp] = useState('none');
  const [dsp, setDsp] = useState('block');

  const navigate = useNavigate();

  const [n, setN] = useState(0);
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));



  const _component = [
    <Basic1 key={nanoid()} />, //0
    <Basic2 key={nanoid()} />, //1
    <Main key={nanoid()} />, //2
    <Management key={nanoid()} />, //3
    <Error key={nanoid()} />, //4
    <Maintain key={nanoid()} />, //5
    <Rank key={nanoid()} />, //6
    <Competition key={nanoid()} />, //7
    <Contact key={nanoid()} />, //8
    <About key={nanoid()} />, //9

    <Advertisement key={nanoid()} />, //10
    <Settings key={nanoid()} />, //11

    <Parameters key = {nanoid()} />,
    <Logout key={nanoid()} />, //12
  ];


  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem(
      '',
      '-1',
      <a href="https://www.w3schools.com" target="blank">
        <Image src={tinysawelllogo} width={250 * times} preview={false} />
      </a>,
    ),
    getItem('目錄', '20', <MenuOutlined />, [
      {
        type: 'group',
        // label: 'Item 1',
        children: [
          {
            label: <div style={{ fontSize: `${25 * times}px` }}> 首頁 </div>,
            key: '0',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 綠能排行榜 </div>
            ),
            key: '1',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 運動機台資料 </div>
            ),
            key: '2',
          },
          {
            label: <div style={{ fontSize: `${25 * times}px` }}> 管理者 </div>,
            key: '3',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 器材錯誤資料 </div>
            ),
            key: '4',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 保養管理 </div>
            ),
            key: '5',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 俱樂部排名 </div>
            ),
            key: '6',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 連線比賽 </div>
            ),
            key: '7',
          },

          {
            // type:'group',
            label: <div style={{ fontSize: `${25 * times}px` }}> 說明 </div>,
            children: [
              {
                label: (
                  <div style={{ fontSize: `${25 * times}px` }}> 聯繫 </div>
                ),
                key: '8',
              },
              {
                label: (
                  <div style={{ fontSize: `${25 * times}px` }}> 關於 </div>
                ),
                key: '9',
              },
            ],
          },
          // {
          //   label: (
          //     <div style={{ fontSize: `${25 * times}px` }}> 說明 </div>
          //   ),
          //   key: '9',
          // },
        ],
      },
    ]),

    getItem('設定', '100', <SettingOutlined />, [
      {
        type: 'group',
        children: [
          {
            label: <div style={{ fontSize: `${25 * times}px` }}> 廣告 </div>,
            key: '10',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 機台設定 </div>
            ),
            key: '11',
          },
          {
            label: (
              <div style={{ fontSize: `${25 * times}px` }}> 參數設定 </div>
            ),
            key: '12',
          },
        ],
      },
    ]),
    getItem('登出', '13', <LogoutOutlined />),
    // getItem('全螢幕', '13', <LogoutOutlined />),
  ];

  const getMenuItem = (item) => {
    console.log(item);
    console.log(item.key);
    setN(item.key * 1); // *1 將成數字
  };

  const [a ,setA] = useState('a')

// 這個會影響重新做2次的動作出來
  useEffect(() => {
    setTimeout(() => {
      setDsp('block');  // ????????? 你若關了它它就是全黑

    }, 100);
  }, []);

  const abc = () =>{
    setDsp('block');
  }

  // //每一秒去尋問後台資料
  // useEffect(() => {
  //   // 先發射後再每10秒發射1次
  //   // everyEmit()
  //   // 每10秒發射一次
  //   const t1 = setInterval(() => {
  //     console.log ("menu ---多次調用????")
  //     // everyEmit();
  //     return ()=>{
  //       clearInterval(t1)
  //     }
  //   }, 10000);

  // }, []);


  const everyEmit = () => {
    // console.log('我準備發射給後端了-basic1')
    const token = localStorage.getItem('saclub_accessToken');
    // console.log('token = ', token)
    // socketio.emit(
    //   'clubGetAllFacilityData',
    //   JSON.stringify({ saclub_accessToken: token }),
    // );
  };












  const exitFullScreen = () => {
    document.exitFullscreen();
  };


const fullScreen = () =>
{

  // console.log(document.fullscreenElement)  一次null , 一次有值
  if (document.fullscreenElement) {
    document.exitFullscreen()
    setIsFull(false)
  } else {
    document.documentElement.requestFullscreen()
    setIsFull(true)
  } 
  } 
  




  const fullScreenxxx = () => {
    setIsFull(!isFull)  // 反相
    if (!isFull) {
    // let elem = document.getElementById('fullscreen');   // 不要綁定它會下拉框不出來的情況
    let elem = document.documentElement; // document.documentElement
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } 
    // else if (elem.webkitRequestFullscreen) {
    //   elem.webkitRequestFullscreen();
    // }
  }
else 
document.exitFullscreen();
}
  // 監聽事件
  addEventListener('fullscreenchange', (event) => {
    console.log('fullscreen');
  });
  // onfullscreenchange = (event) => {console.log('onfullscreenchange') };

  // addEventListener('onfullscreenchange', (event) => {console.log('onfullscreen') });

  return (
    <div style={{ width: '100%', height: '100%' }} id="fullscreen">
      {/* <Layout  className={styles.body0} style={{marginTop:'0.1%'}}> */}
      {/* 注意上邊界是一定要的我目前先設0.1%但會有問題畫面太大先改回0 */}
     


        
  {/* <Button onClick={abc}> aa </Button>    */}
     
      <Layout
        className={styles.body0}
        style={{ marginTop: '0%', display: `${dsp}` }}
      >
        <Row> 
          <Col span={24}> 
        <Header
          className="layout"
          style={{  textDecorationLine: false , padding:0}}
        >
         
          <Menu
            // disabled = {false}
            onClick={getMenuItem}
            style={{
              backgroundColor: '#707070',
              borderWidth: 0,
              color: 'white',
              fontSize: `${30 * times}px`,
            }}
            defaultSelectedKeys={['0']}
            mode="horizontal"
            items={items}
          ></Menu>


          {/* <Button
            style={{ position: 'absolute', right: '20px', top: '15px' }}
            onClick={fullScreen}
          >
            full
          </Button> */}
          <div
            style={{
              position: 'absolute',
              right: '30px',
              top: '5px',
              color: 'white',
              fontSize: `${40 * times}px`,
              cursor: 'pointer',
            }}
            onClick={fullScreen}
          >
            {isFull ? <FullscreenOutlined /> : <FullscreenExitOutlined />}
          </div>

          {/* <Button
            style={{ position: 'absolute', right: '80px', top: '15px' }}
            onClick={exitFullScreen}
          >
            Exitfull
          </Button> */}
        </Header>
        </Col>
        </Row>

<Row> 
  <Col span={24}>
        <Content style={{ marginTop: 20 }}>
          {/* 組件引入 */}
          {_component[n]}
        </Content>
        </Col>
        </Row>
      </Layout>
    </div>
  );
}
