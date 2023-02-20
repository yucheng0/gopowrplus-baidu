// 引入antd chart =>  https://v0-charts.ant.design/demos/global#%E5%A4%9A%E6%8A%98%E7%BA%BF%E5%9B%BE

import { useNavigate } from '@umijs/max';
import { useModel } from 'umi';
import { Pie, Line } from '@ant-design/plots';
import { Image, Row, Col, Button } from 'antd';
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

export default function Main() {
  const [wsErrorOpen, setWsErrorOpen] = useState(true);

  // 底下這個是ws保留全局用的
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

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

  return (
    <div>
      {/* <WsError wsErrorOpen={wsErrorOpen} setWsErrorOpen={setWsErrorOpen} /> */}

      {/* #333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色 */}

      <div>
        {/* 第二行 */}

        {/* 共用的訊息 */}
        <Row>
          <Col span={3}></Col>
          <Col>
            <div>
              <span style={{ fontSize: 20 }}>
                <Button
                  type="text"
                  style={{ color: `${listViewColor}` }}
                  onClick={listView}
                >
                  列表檢視
                </Button>
              </span>
              /&zwnj;/
              <span style={{ fontSize: 20 }}>
                <Button
                  type="text"
                  style={{ color: `${charViewColor}` }}
                  onClick={charView}
                >
                  圖像檢視
                </Button>
              </span>
            </div>
          </Col>

          <Col span={2}></Col>

          <Col span={6}>
            <div className="abc">
              俱樂部綠能總合&nbsp;:
              <span>&nbsp; 600918.98 瓦時</span>
            </div>
          </Col>
          <Col span={6}>
            <div style={{ color: '#84bd00', fontSize: 20, opacity: 1 }}>
              全球綠能&nbsp;:
              <span style={{ color: '#84bd00', opacity: 1 }}>
                &nbsp;8803576.01 瓦時
              </span>
            </div>
          </Col>
        </Row>

        {/*   曲線圖檢視 */}
        <div
          style={{
            display: `${chart === true ? 'block' : 'none'}`,
            // display: 'block',
          }}
        >
          {console.log('charViewColor = ', charViewColor)}
          {charViewColor === 'white' ? <LineChart /> : <PieChart />}
        </div>

        {/* 列表檢視 */}
      </div>
    </div>
  );
}
