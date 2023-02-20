import { nanoid } from 'nanoid';
import { useNavigate } from '@umijs/max';
import { Button, Layout, Menu, Image, Row, Col } from 'antd';
import { useModel, Outlet } from 'umi';
import { useState, useEffect, useRef } from 'react';
const { Header, Content, Footer } = Layout;
// 組件引入
// import Basic1 from '@/components/Basic1'; // key=0
// import Basic2 from '@/components/Basic2'; // key= 1
// import Main from '@/components/Main'; //2
// import Management from '@/components/Management'; //3
// import Error from '@/components/error.js'; //4
// import Maintain from '@/components/maintain.js'; //5
// import Rank from '@/components/Rank'; //6
// import Competition from '@/components/competition.js'; //7
// import Contact from '@/components/Contact'; //7
// import About from '@/components/About'; //7

// import Advertisement from '@/components/Advertisement'; //8
// import Settings from '@/components/Settings'; //8

// import Logout from '@/components/logout.js'; //9
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

export default function MenuBasic() {
  console.log('Menu- Basic1 到底進來幾次')
  const [isFull, setIsFull] = useState();

  // const _component = [
  //   <Basic1 key={nanoid()} />, //0
  //   <Basic2 key={nanoid()} />, //1
  //   <Main key={nanoid()} />, //2
  //   <Management key={nanoid()} />, //3
  //   <Error key={nanoid()} />, //4
  //   <Maintain key={nanoid()} />, //5
  //   <Rank key={nanoid()} />, //6
  //   <Competition key={nanoid()} />, //7
  //   <Contact key={nanoid()} />, //8
  //   <About key={nanoid()} />, //9

  //   <Advertisement key={nanoid()} />, //10
  //   <Settings key={nanoid()} />, //11

  //   <Logout key={nanoid()} />, //12
  // ];

  const [screenWidth, setScreenWidth] = useState(1920);
  const [screenHeight, setScreenHeight] = useState(1080);
  const [times, setTimes] = useState(screen/1920);
  const [dsp, setDsp] = useState('none');
  
  // setTimesxxx(2); // 以1920px為主去做的

  useEffect(() => {
    // setScreenWidth(screen.width);
    // setScreenHeight(screen.height);
  //   // setTimesxxx(2); // 以1920px為主去做的

  }, []);

  const navigate = useNavigate();

  const [n, setN] = useState(0);
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  








  

  return (
   <>
   Hello
   </>
  );
}
