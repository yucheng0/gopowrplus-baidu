// 引入antd chart =>  https://v0-charts.ant.design/demos/global#%E5%A4%9A%E6%8A%98%E7%BA%BF%E5%9B%BE

import { useNavigate } from '@umijs/max';
import { useModel } from 'umi';
import { Pie, Line } from '@ant-design/plots';
import { Image, Row, Col, Button, Select } from 'antd';
import { useState, useEffect } from 'react';
import request from 'umi-request';
// ICon
import {
  WifiOutlined,
  LeftCircleFilled,
  CodeSandboxCircleFilled,
  ConsoleSqlOutlined,
} from '@ant-design/icons';

// 引入圖像
import tinysawelllogo from '@/assets/images/sa/tinysawelllogo.svg';
import bxwifioff from '@/assets/images/sa/bx-wifi-off.svg';
import tools from '@/assets/images/sa/tools.svg';

import stickers from '@/assets/images/sa/stickers.jpg';
// 引入樣式
import '@/pages/Login/index.less';
// 引入模組

import LineChart from './indexLine.js';
import PieChart from './indexPie.js';
import StackColumnPlot from './stack_column_plot.js'
import PercentStackedArea from './Percent_Stacked_Area'
import TheCausesOfCO2Emissions from './The_causes_of_CO2_emissions'
import StepLineMultiplePlot from './Step_line_multiple_plot'

import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

export default function Main() {
  const [wsErrorOpen, setWsErrorOpen] = useState(true);

  // 底下這個是ws保留全局用的
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  const [screenWidth, setScreenWidth] = useState(screen.width)
  const [screenHeight, setScreenHeight] = useState(screen.height)
  const [times, setTimes] = useState(screen.width / 1920)

  // document.title = "Menu";
  const navigate = useNavigate();
  const [chart, setChart] = useState(true);
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  const [charViewColor, setCharViewColor] = useState('white');
  const [listViewColor, setListViewColor] = useState('#84bd00');

  // const [charViewColor,setCharViewColor] = useState('#84bd00')

  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  // 資料模擬可以用mock來做也行
  // 它有一個缺點, 實際用在產品上會有問題找不到資料
  const asyncFetchMock = () => {
    request
      // 使用mock 資料 GET /api/userdata 它是api
      .get('/api/userdata')
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // // ct = cycle time
  // // 進來1s 執行完後改為10sec運作
  // let ct = 1000;
  // // 每一秒去尋問後台資料
  // useEffect(() => {
  //   // 先發射後再每10秒發射1次
  //   everyEmit();
  //   // 每10秒發射一次
  //   setInterval(() => {
  //     everyEmit();
  //   }, 10000);
  // }, []);

  // const everyEmit = () => {
  //   console.log('我準備發射給後端了');
  //   // var dat = localStorage.getItem('saclub_accessToken')
  //   const token = localStorage.getItem('saclub_accessToken');
  //   console.log('token = ', token);

  //   socketio.emit(
  //     'clubGetAllFacilityData',
  //     JSON.stringify({ saclub_accessToken: token }),
  //   );
  //   socketio.on('retClubGetAllFacilityData', (result) => {
  //     let data = JSON.parse(result);
  //     // 採用訂閱與發佈傳值到Menu 內去看
  //     // data.map((item,key)=>{
  //     //    console.log('result:', item)
  //     //   return item
  //     // })
  //     // console.log('result:', result)
  //   });
  // };

  // 使用public 的方法, 它是固定
  const asyncFetch = () => {
    request
      .get('./data.json')
      .then(function (response) {
        setData(response);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const config = {
    data,
    xField: 'hour',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    // color: ['#1979C9', '#D62A0D', '#FAA219'],
    color: ['red', 'blue', 'white', 'yellow', 'pink'],
  };

  const charView = () => {
    setCharViewColor('#84bd00');
    setListViewColor('white');
  };
  const listView = () => {
    setCharViewColor('white');
    setListViewColor('#84bd00');
  };


  // let times = screen.width / 1920
  //建立一個監聽器去監聽螢幕大小發生變化
  window.addEventListener('resize', () => {
    setScreenWidth(screen.width)
    setScreenHeight(screen.height)
    setTimes(screen.width / 1920)
    console.log(screen.width / 1920)
    console.log(screen.width, screen.height, screen.width / 1920)
  })

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div>

      <>
        <Layout>
          <Header style={{ color: 'white' }}>
            <Row>
              <Col 
               xs={11}   // <576px
              sm={7}    // > = 576px
               md={5}   // >=768px
                lg={4}  // >=992px
                xl={4}  //>=1200px
                 xxl={2}  //1600px
>
                <Select
                  defaultValue="時間"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'time',
                      label: '時間',
                    },
                    {
                      value: 'distance',
                      label: '距離',
                    },
                    {
                      value: 'greenEnergy',
                      // disabled: true,
                      label: '綠能',
                    },
                  ]}
                />

              </Col>
              <Col xs={11} sm={7} md={5} lg={4} xl={4} xxl={2}>
                <Select
                  defaultValue="本日"
                  style={{
                    width: 120,
                  }}
                  onChange={handleChange}
                  options={[
                    {
                      value: 'day',
                      label: ' 本日 ',
                    },
                    {
                      value: 'week',
                      label: '本周',
                    },
                    {
                      value: 'month',
                      // disabled: true,
                      label: '本月',
                    },
                    {
                      value: 'decade',
                      // disabled: true,
                      label: '十年',
                    },
                    {
                      value: 'custom',
                      // disabled: true,
                      label: '使用者自訂',
                    },
                  ]}
                />


              </Col>
              {/* <Col span={3}> 搜尋器材</Col> */}
            </Row>
          </Header>
        </Layout>
        {/* 1 */}
        <Row>
          <Col xs={24} sm={24} md={12} style={{padding:5}}>
            <Layout>
              <Content width="100%" style={{ backgroundColor: 'white', paddingTop:100 }}>
                <LineChart />
              </Content>
            </Layout>
          </Col>

          <Col xs={24} sm={24} md={12} style={{padding:5}}>
            <Layout>
              <Content width="100%" style={{ backgroundColor: 'lightgray'}}>
                <PieChart />
              </Content>
            </Layout>
          </Col>
        </Row>


        {/* ----- 2 ------- */}
        <Row>
          <Col xs={24} sm={24} md={12} style={{padding:5}} >
            <Layout>
              <Content width="100%" style={{ backgroundColor: 'pink', padding:10 }}>
                <StackColumnPlot />
              </Content>
            </Layout>
          </Col>

          <Col xs={24} sm={24} md={12} style={{padding:5}}>
            <Layout>
              <Content width="100%" style={{ backgroundColor: 'lightyellow',padding:10  }}>
                <PercentStackedArea />
              </Content>
            </Layout>
          </Col>
        </Row>


        {/* ------- 3 -------  */}
        <Row>
          <Col xs={24} sm={24} md={12} style={{padding:5}}>
            <Layout>
              <Content width="100%" style={{ backgroundColor: 'white',padding:10  }}>
                <TheCausesOfCO2Emissions />
              </Content>
            </Layout>
          </Col>

          <Col xs={24} sm={24} md={12}  style={{padding:5}}>
            <Layout>
              <Content width="100%" style={{ backgroundColor: '#eeeeee',padding:10  }}>
                <StepLineMultiplePlot />
              </Content>
            </Layout>
          </Col>
        </Row>
        <Row>
          <Col>
          <br/>
    <br/>
          </Col>
        </Row>
      </>







      {/* <WsError wsErrorOpen={wsErrorOpen} setWsErrorOpen={setWsErrorOpen} /> */}

      {/* #333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色 */}


    </div>
  );
}
