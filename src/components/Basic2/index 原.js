import { Layout, Row, Col, Image, Avatar, DatePicker, Space } from 'antd';
import React, { useEffect, useState, CSSProperties } from 'react';
import styles from './index.less';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const weekFormat = 'MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;







import {
  ConsoleSqlOutlined,
  UserOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import { Navigate, Outlet, useModel } from 'umi';

import Frame from './frame.js';
import List from './list.js';
import { MAIN_COLOR } from '@/constants';

const { Header, Footer, Sider, Content } = Layout;

let day = 0
let week = 0
let month = 0

let duration = {}
let acc_duration = 0

let endTime = "Hello"

const App = () => {
  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [screenHeight, setScreenHeight] = useState(screen.height);
  const [times, setTimes] = useState(screen.width / 1920);
  const [dsp, setDsp] = useState('none');

  const [todayGreen, setTodayGreen] = useState(0);
  const [totalGreen, setTotalGreen] = useState(0);
  const [cycleChange, setCycleChange] = useState(0);
  const [renderNow, setRenderNow] = useState(false);

  useEffect(()=>{

setTimeout(()=>{

endTime = "2022-03-01"

},3000)

  },[])
  // const [advText, setAdvText] = useState(
  //   '歡迎光臨力伽實業股份有限公司....Welcome to SportArt....欢迎光临时宝雅...',
  // );

  // 底下這個是advText保留全局用的
  const { advText, setAdvText } = useModel('advtext', (ret) => ({
    advText: ret.advText, // 傳來目前的值
    setAdvText: ret.setAdvText, // 傳來方法
  }));
  // 全局變數socketio (注意入口一定要走路由login 才會取得到全局)
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  useEffect(() => {
    setTimeout(() => {
      // setScreenWidth(screen.width);
      // setScreenHeight(screen.height);
      // setTimes(screen.width / 1920); // 以1920px為主去做的
      const root = document.documentElement;

      // css 變數設定（好用）
      root.style.setProperty('--w', screen.width);
      // root.style.setProperty('--f',`${10}px`)

      // window.less.modifyVars({
      //   '@f': '20px'
      // })

      setDsp('block');
    }, 100);

    // const style = {'--f',}
  }, []);

  // 一進來就去讀取資料庫的廣告訊息
  useEffect(() => {
    const token = localStorage.getItem('saclub_accessToken');
    // 它可以直接送對象不用送token
    console.log('送出clubGetAdvText3');
    socketio.emit(
      'clubGetAdvText',
      JSON.stringify({ saclub_accessToken: token }),
    );
  }, []);

  useEffect(() => {

    document.getElementById('duration_start_time').style.color = MAIN_COLOR
    document.getElementById('duration_end_time').style.color = MAIN_COLOR


  }, [])

  // 留著回調函數的變數用v 而不用cycleChange 當備用
  // useEffect(() => {
  //   let id = setInterval(() => {

  //     setCycleChange(v => {
  //       if (v >= 2)
  //       {
  //         console.log ('v=',v)
  //         return 0
  //       }

  //       else{
  //         console.log ('v=',v)
  //         return v + 1;
  //       }


  //     });
  //   }, 1000);
  //   return () => clearInterval(id);

  // }, []);


  PubSub.unsubscribe('duration');
  PubSub.subscribe('duration', (msg, data) => {
    duration = data
    console.log('datadata', data)
    // duration = data.duartion;
    console.log('duration', duration)
  });


  // 進來就調用1次
  useEffect(() => {
    console.log("多次調用????qqqqq", new Date())
    const token = localStorage.getItem('saclub_accessToken');
    let nowTime = new Date();
    let time_zone = nowTime.getTimezoneOffset() / 60 * -1;

    setCycleChange(v => {
      if (v >= 2) {
        // console.log ('v=',v)
        return 0
      }
      else {
        // console.log ('v=',v)
        return v + 1;
      }
    })
    socketio.emit(
      'clubGetAllFacilityData',
      JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
    );


  }, [])

  // 調用
  useEffect(() => {
    const t3 = setInterval(function () {
      console.log("多次調用????xxxx", new Date())
      const token = localStorage.getItem('saclub_accessToken');
      let nowTime = new Date();
      let time_zone = nowTime.getTimezoneOffset() / 60 * -1;

      setCycleChange(v => {
        if (v >= 2) {
          return 0
        }

        else {
          return v + 1;
        }
      })

      socketio.emit(
        'clubGetAllFacilityData',
        JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
      );
    }, 10000)
    return () => {
      console.log('離開了t3')
      clearInterval(t3)
      // socketio.off('clubGetAllFacilityData') //?????????????
    }
  }, [])


  PubSub.unsubscribe('retClubGetAllFacilityData');
  PubSub.subscribe('retClubGetAllFacilityData', (msg, data) => {
    console.log('msg=', msg); // 解出clubResisterResult
    console.log('data=', data); // 解出真正的data內容
    setTotalGreen((data.global * 1).toFixed(2));
    day = data.day
    week = data.week
    month = data.month
    acc_duration = data.duration

    console.log(day)
    console.log(week)
    console.log(month)
    console.log(acc_duration)
    // setClubGreen((data.club * 1).toFixed(2));
    // global_clubGreen = (data.global * 1).toFixed(2);

  });



  const start_OnChange = (date, dateString) => {
    console.log(date, dateString);
    duration.start_time = dateString
    PubSub.publish('duration', duration);
  };



  const end_OnChange = (date, dateString) => {
    console.log(date, dateString);
    duration.end_time = dateString
    PubSub.publish('duration', duration);

    // 馬上調用Render 
    // setRenderNow(renderNow => !renderNow);  

    console.log("多次調用????oooo", new Date())
    const token = localStorage.getItem('saclub_accessToken');
    let nowTime = new Date();
    let time_zone = nowTime.getTimezoneOffset() / 60 * -1;

    // setCycleChange(v => {
    //   if (v >= 2) {
    //     // console.log ('v=',v)
    //     return 0
    //   }
    //   else {
    //     // console.log ('v=',v)
    //     return v + 1;
    //   }
    // })

    setRenderNow(renderNow => !renderNow)
    socketio.emit(
      'clubGetAllFacilityData',
      JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
    );
  };


  return (
    <div style={{ display: `${dsp}` }}>


<Space direction="vertical" size={12}>
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={dateFormat} />
    <DatePicker defaultValue={dayjs('01/01/2015', dateFormatList[0])} format={dateFormatList} />
    <DatePicker defaultValue={dayjs('2015/01', monthFormat)} format={monthFormat} picker="month" />
    <DatePicker defaultValue={dayjs()} format={customWeekStartEndFormat} picker="week" />
    <RangePicker
      defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
      format={dateFormat}
    />
    <DatePicker defaultValue={dayjs('2015/01/01', dateFormat)} format={customFormat} />
  </Space>









      {/* {console.log(times)}  1920=>1 */}
      <Layout>
        <Layout>
          <header className={styles.body0}>
            <Row>
              <Col offset={1}>
                {/* <div className={`${styles.bigfont} ${styles.maincolor}`}> */}
                <div
                  style={{
                    fontSize: `${45 * times}px`,
                    color: 'white',
                    // color: MAIN_COLOR,
                    marginTop: `${20 * times}px`,
                  }}
                >
                  <b>累積綠能排名</b><span style={{fontSize:10}}>Wh</span>
                </div>
              </Col>
            </Row>
          </header>
        </Layout>

        <Layout>
          <Sider width={'50%'} className={styles.body1}>
            <div className={styles.maincolor}>
              <Row justify="start">
                <Col offset={2} span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}>男 </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> 女 </span>
                </Col>
              </Row>

              {/* ======================= */}

              <Row justify="center">
                <Col span={11}>
                  <Frame name="Paul Kuo" value="3968.06" />
                </Col>
                <Col span={11}>
                  <Frame name="Sophia" value="3000.66" />
                </Col>
              </Row>

              {/* 第3行  */}
              <Row justify="start">
                <Col offset={2}>
                  <div
                    style={{
                      fontSize: `${45 * times}px`,
                      marginTop: `${30 * times}px`,
                      color: 'white',
                    }}
                  >
                    {
                      cycleChange === 0 ? <b>本日排行榜</b>   : cycleChange === 1 ?
                        <b>本周排行榜</b> : <b>本月排行榜</b>
                    }
                    <span style={{fontSize:10}}>Wh</span>
                  </div>
                </Col>
              </Row>

              <Row justify="start">
                <Col offset={2} span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> 男 </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> 女 </span>
                </Col>
              </Row>
              <Row justify="center">
                <Col span={11}>
                  <Frame name="Michael" value="3968.06" />
                </Col>
                <Col span={11}>
                  <Frame name="Ivy" value="3968.06" />
                </Col>
              </Row>
              {/* ==========產生綠能Wh=============== */}
              <Row justify="start">
                <Col offset={2}>
                  <div
                    style={{
                      fontSize: `${45 * times}px`,
                      marginTop: `${30 * times}px`,
                      color: 'white',
                    }}
                  >
                    <b>產生綠能</b><span style={{fontSize:10}}>Wh</span>
                  </div>
                </Col>
              </Row>
              <Row justify="center">
                <Col offset={2} span={11}>
                  <span style={{ fontSize: `${25 * times}px`, color: 'white' }}>
                    總綠能
                  </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${25 * times}px`, color: 'white' }}>
                    選擇日期區間
                  </span>
                </Col>
              </Row>

              {/* 從這裡處理 */}
              <Row justify="start">
                {/* 左邊區塊處理 */}
                <Col span={9} offset={2}>
                  <Col
                    span={24}
                    className={styles.maincolorwithframe}
                    style={{
                      marginTop: `${3 * times}px`,
                      marginBottom: `${10 * times}px`,
                      textAlign: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontSize: `${40 * times}px`,
                        padding: `${15 * times}px`,
                      }}
                    >
                      {totalGreen}
                    </span>
                  </Col>
                  {/* 處理今日/本週/全月 */}
                  <Col>
                    <Row>
                      <Col span={7} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          今日
                        </span>
                        <Row>
                          <Col
                            span={22}
                            className={styles.maincolorwithframe}
                            style={{ textAlign: 'center' }}
                          >
                            <span style={{ fontSize: `${20 * times}px` }}>
                              {(day * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={7} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          本週
                        </span>
                        <Row>
                          <Col
                            span={22}
                            className={styles.maincolorwithframe}
                            style={{ textAlign: 'center' }}
                          >
                            <span style={{ fontSize: `${20 * times}px` }}>
                              {(week * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={10} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          全月
                        </span>
                        <Row>
                          <Col
                            span={24}
                            className={styles.maincolorwithframe}
                            style={{ textAlign: 'center' }}
                          >
                            <span
                              style={{
                                fontSize: `${20 * times}px`,
                              }}
                            >
                              {(month * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Col>

                {/* 右邊區塊處理 */}

                <Col span={9} offset={2} className={styles.maincolorwithframe}>
                  <Row>
                    <Col
                      span={12}
                      style={{
                        textAlign: 'center',
                        marginTop: `${10 * times}px`,
                      }}
                    >
                      <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>開始</span>
                      <Row>
                        <Col
                          span={22}
                          className={styles.maincolorwithframe}
                          style={{
                            textAlign: 'center',
                            margin: `${3 * times}px`,
                            marginLeft: `${10 * times}px`,
                          }}
                        >
                          <span style={{ fontSize: `${25 * times}px` }}>

                            <Space direction="vertical">
                              <DatePicker placeholder='Start Time' id='duration_start_time' style={{ backgroundColor: 'transparent', border: 'none' }} onChange={start_OnChange} />
                            </Space>

                          </span>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      span={12}
                      style={{
                        textAlign: 'center',
                        marginTop: `${10 * times}px`,
                      }}
                    >
                      <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>結束</span>

                      <Row>
                        <Col
                          span={22}
                          className={styles.maincolorwithframe}
                          style={{
                            textAlign: 'center',
                            margin: `${3 * times}px`,
                          }}
                        >
                          <span
                            style={{
                              fontSize: `${25 * times}px`,
                              padding: `${10 * times}px`,

                            }}
                          >
                            <Space direction="vertical">
                              <DatePicker placeholder="end time" id='duration_end_time' style={{ backgroundColor: 'transparent', border: 'none' }} onChange={end_OnChange} />
                            </Space>

                          </span>
                        </Col>
                      </Row>

                    </Col>
                  </Row>
                  {/* 區間累積值放置處 */}
                  <Row>
                    <Col
                      className={styles.maincolorwithframe}
                      span={22}
                      style={{
                        textAlign: 'center',
                        marginTop: `${10 * times}px`,
                        // margin: `${3 * times}px`,
                        marginBottom: `${0 * times}px`,
                        marginLeft: `${15 * times}px`,

                      }}
                    >
                      <span
                        style={{
                          fontSize: `${20 * times}px`,
                        }}
                      >
                        {(acc_duration * 1).toFixed(2)}
                      </span>
                    </Col>
                  </Row>
                  {/* 第2行 */}
                  <Row>
                    <Col span={24}> </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Sider>
          {/* ==================第2行============================= */}
          <Sider width={'50%'} className={styles.body3}>
            <Row>
              <Col span={22} style={{ color: MAIN_COLOR }}>
                <span style={{ fontSize: `${30 * times}px`, color: 'white' }}>
                  即時排名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;累積排名
                </span>
              </Col>
              <Col span={22}>
                <List />
              </Col>
            </Row>
          </Sider>
        </Layout>
        <Layout></Layout>

        <Footer
          style={{
            backgroundColor: 'gray',
            color: 'white',
            padding: 0,
            margin: 0,
            marginTop: `${3 * times}%`,
          }}
        >
          {/* <Footer> */}
          <div
            style={{
              width: `${1920 * times}px`,
              height: `${50 * 1.5 * times}px`,
              color: 'white',
              backgroundColor: 'gray',
            }}
          >
            <div
              className={styles.marquee}
              style={{
                fontSize: `${35 * 1.5 * times}px`,
                position: 'relative',
                //  top:`${20*times}px`,
              }}
            >
              {/* <p>歡迎光臨力伽實業股份有限公司....Welcome to SportArt....欢迎光临时宝雅...</p> */}
              <p> {advText}</p>
            </div>
          </div>
        </Footer>
      </Layout>
      {/* <div className='xyz'>xyz</div> */}
      {/* <Avatar size={32*times} icon={<UserOutlined />} /> */}
      {/* 流動字串 */}
    </div>
  );
};
export default App;
