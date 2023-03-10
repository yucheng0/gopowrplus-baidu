import { Layout, Row, Col, Image, Avatar, DatePicker, Space } from 'antd';
import React, { useEffect, useState, CSSProperties } from 'react';
import styles from './index.less';
import './index.css'


// dayjs
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

//

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM-DD';
const monthFormat = 'YYYY-MM';
const dateFormatList = ['DD-MM-YYYY', 'DD-MM-YY'];
const customFormat = (value) => `custom format: ${value.format(dateFormat)}`;
const customWeekStartEndFormat = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;




let start_time = null


import {
  ConsoleSqlOutlined,
  UserOutlined,
  WindowsFilled,
  CloseCircleTwoTone,
  CloseCircleFilled,
  CalendarFilled,
  CloseCircleOutlined
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
// duration.start_time = "2023/01/01"
// duration.end_time = "2023/12/31"
duration.start_time = ""
duration.end_time = ""


let acc_duration = 0

const App = () => {
  const [screenWidth, setScreenWidth] = useState(screen.width);
  const [screenHeight, setScreenHeight] = useState(screen.height);
  const [times, setTimes] = useState(screen.width / 1920);
  const [dsp, setDsp] = useState('none');

  const [todayGreen, setTodayGreen] = useState(0);
  const [totalGreen, setTotalGreen] = useState(0);
  const [cycleChange, setCycleChange] = useState(0);
  const [renderNow, setRenderNow] = useState(false);


  // ???????????????advText??????????????????
  const { advText, setAdvText } = useModel('advtext', (ret) => ({
    advText: ret.advText, // ??????????????????
    setAdvText: ret.setAdvText, // ????????????
  }));
  // ????????????socketio (??????????????????????????????login ?????????????????????)
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // ??????????????????
    setSocketio: ret.setSocketio, // ????????????
  }));

  useEffect(() => {
    setTimeout(() => {
      // setScreenWidth(screen.width);
      // setScreenHeight(screen.height);
      // setTimes(screen.width / 1920); // ???1920px???????????????
      const root = document.documentElement;

      // css ????????????????????????
      root.style.setProperty('--w', screen.width);
      // root.style.setProperty('--f',`${10}px`)

      // window.less.modifyVars({
      //   '@f': '20px'
      // })

      setDsp('block');
    }, 100);

    // const style = {'--f',}
  }, []);

  // ?????????????????????????????????????????????
  useEffect(() => {
    const token = localStorage.getItem('saclub_accessToken');
    // ?????????????????????????????????token
    console.log('??????clubGetAdvText3');
    socketio.emit(
      'clubGetAdvText',
      JSON.stringify({ saclub_accessToken: token }),
    );
  }, []);

  useEffect(() => {

    //document.getElementById('duration_start_time').style.color = MAIN_COLOR
    //document.getElementById('duration_end_time').style.color = MAIN_COLOR
    // document.getElementById('duration_time').style.color = MAIN_COLOR


  }, [])

  // ??????????????????????????????v ?????????cycleChange ?????????
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


  // ?????????????????????
useEffect(()=>{
  PubSub.publish('duration', duration);
},[])

  // ???????????????1???
  useEffect(() => {
    console.log("????????????????qqqqq", new Date())
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

  // ??????
  useEffect(() => {
    const t3 = setInterval(function () {
      console.log("????????????????xxxx", new Date())
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
      console.log('?????????t3')
      clearInterval(t3)
      // socketio.off('clubGetAllFacilityData') //?????????????
    }
  }, [])

useEffect(()=>{
console.log ('aaa = ', document.querySelector('.ant-picker-input ant-picker-input-active'))
console.log('bbbbbb')

},[])


  PubSub.unsubscribe('retClubGetAllFacilityData');
  PubSub.subscribe('retClubGetAllFacilityData', (msg, data) => {
    console.log('msg=', msg); // ??????clubResisterResult
    console.log('data=', data); // ???????????????data??????
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


  const rangeOnChange = (date, dateString) => {
    // console.log(date, dateString);
    //   console.log('date', date)
    //  console.log('dateString' ,dateString)
    // console.log('dateString[0]', dateString[0])
    // console.log('dateString[1]', dateString[1])

    if (dateString[0] !== '' && dateString[1] !== '') {
      duration.start_time = dateString[0]
      duration.end_time = dateString[1]
      console.log("?????????")

      PubSub.publish('duration', duration);

      // console.log("????????????????oooo", new Date())
      const token = localStorage.getItem('saclub_accessToken');
      let nowTime = new Date();
      let time_zone = nowTime.getTimezoneOffset() / 60 * -1;

      // ????????????Render 
      setRenderNow(renderNow => !renderNow)
      socketio.emit(
        'clubGetAllFacilityData',
        JSON.stringify({ saclub_accessToken: token, time_zone: time_zone, duration: duration }),
      );
    };
  }

  return (
    <div style={{ display: `${dsp}` }}>



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
                  <b>??????????????????</b><span style={{ fontSize: 10 }}>Wh</span>
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
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}>??? </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> ??? </span>
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

              {/* ???3???  */}
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
                      cycleChange === 0 ? <b>???????????????</b> : cycleChange === 1 ?
                        <b>???????????????</b> : <b>???????????????</b>
                    }
                    <span style={{ fontSize: 10 }}>Wh</span>
                  </div>
                </Col>
              </Row>

              <Row justify="start">
                <Col offset={2} span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> ??? </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${30 * times}px`, color: 'white', }}> ??? </span>
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
              {/* ==========????????????Wh=============== */}
              <Row justify="start">
                <Col offset={2}>
                  <div
                    style={{
                      fontSize: `${45 * times}px`,
                      marginTop: `${30 * times}px`,
                      color: 'white',
                    }}
                  >
                    <b>????????????</b><span style={{ fontSize: 10 }}>Wh</span>
                  </div>
                </Col>
              </Row>
              <Row justify="center">
                <Col offset={2} span={11}>
                  <span style={{ fontSize: `${25 * times}px`, color: 'white' }}>
                    ?????????
                  </span>
                </Col>
                <Col span={11}>
                  <span style={{ fontSize: `${25 * times}px`, color: 'white' }}>
                    ??????????????????
                  </span>
                </Col>
              </Row>

              {/* ??????????????? */}
              <Row justify="start">
                {/* ?????????????????? */}
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

                      {totalGreen >=10000 ?(totalGreen*1).toFixed(0) :(totalGreen*1).toFixed(2) }
                    </span>
                  </Col>
                  {/* ????????????/??????/?????? */}
                  <Col>
                    <Row>
                      <Col span={7} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          ??????
                        </span>
                        <Row>
                          <Col
                            span={22}
                            className={styles.maincolorwithframe}
                            style={{ textAlign: 'center' }}
                          >
                            <span style={{ fontSize: `${20 * times}px` }}>
                              {day >=100 ? (day*1).toFixed(0) : (day * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={7} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          ??????
                        </span>
                        <Row>
                          <Col
                            span={22}
                            className={styles.maincolorwithframe}
                            style={{ textAlign: 'center' }}
                          >
                            <span style={{ fontSize: `${20 * times}px` }}>
                              {week>=100? (week*1).toFixed(0) : (week * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                      <Col span={10} style={{ textAlign: 'center' }}>
                        <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>
                          ??????
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
                              {month>=1000? (month*1).toFixed(1):(month * 1).toFixed(2)}
                            </span>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Col>

                {/* ?????????????????? */}

                <Col span={9} offset={2} className={styles.maincolorwithframe}>


                  <Space direction="vertical" size={12}>
                    <RangePicker
                      // defaultValue={[dayjs('2015/01/01', dateFormat), dayjs('2015/01/01', dateFormat)]}
                    
                      // defaultValue= { duration.start_time === '' ? '' : [dayjs(`${duration.start_time}`, dateFormat), dayjs(`${duration.end_time}`, dateFormat)]}
                      defaultValue= { duration.start_time === '' ? '' : [dayjs(`${duration.start_time}`, dateFormat), dayjs(`${duration.end_time}`, dateFormat)]}
        
                      format={dateFormat}
                      style={{ backgroundColor: 'transparent', margin: '10px 3px 10px 3px', padding: '10px 3px 10px 3px', border: 'none' }}
                      size="small"
                      suffixIcon={<CalendarFilled style={{ color: MAIN_COLOR, fontSize: 16 }} />}
                      clearIcon={<CloseCircleFilled style={{ color: 'white', fontSize: 18, position: 'absolute', left: -12, top: -8 }} />}
                      onCalendarChange={rangeOnChange}

                    />
                  </Space>




                  <Row>
                    <Col
                      span={12}
                      style={{
                        textAlign: 'center',
                        marginTop: `${10 * times}px`,
                      }}
                    >
                      {/* <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>??????</span> */}
                      <Row>
                        {/* <Col
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
                              <DatePicker placeholder='Start Time' id='duration_start_time' style={{ backgroundColor: 'transparent', border: 'none' }} onChange={start_OnChange} 
                                 suffixIcon = {<CalendarFilled  style={{color:MAIN_COLOR,fontSize:18}}/>}
                                 clearIcon = { <CloseCircleOutlined style={{color:'red',fontSize:18,backgroundColor:'transparent'}} />   }
                              
                              />
                           
                           
                            </Space>

                          </span>
                        </Col> */}
                      </Row>
                    </Col>
                    <Col
                      span={12}
                      style={{
                        textAlign: 'center',
                        marginTop: `${10 * times}px`,
                      }}
                    >
                      {/* <span style={{ fontSize: `${25 * times}px`, color: 'white', }}>??????</span> */}

                      <Row>
                        {/* <Col
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
                              <DatePicker placeholder="end time" id='duration_end_time' style={{ backgroundColor: 'transparent', border: 'none' }} onChange={end_OnChange}
                                 suffixIcon = {<CalendarFilled  style={{color:MAIN_COLOR,fontSize:18}}/>}
                                 clearIcon = { <CloseCircleFilled style={{color:'red',fontSize:18}} />   }
                              
                              />
                            </Space>

                          </span>
                        </Col> */}
                      </Row>

                    </Col>
                  </Row>
                  {/* ???????????????????????? */}
                  <Row>
                    <Col
                      className={styles.maincolorwithframe}
                      span={22}
                      style={{
                        textAlign: 'center',
                        marginTop: `${0 * times}px`,
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
                  {/* ???2??? */}
                  <Row>
                    <Col span={24}> </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </Sider>
          {/* ==================???2???============================= */}
          <Sider width={'50%'} className={styles.body3}>
            <Row>
              <Col span={22} style={{ color: MAIN_COLOR }}>
                <span style={{ fontSize: `${30 * times}px`, color: 'white' }}>
                  ????????????&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;????????????
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
              {/* <p>??????????????????????????????????????????....Welcome to SportArt....?????????????????????...</p> */}
              <p> {advText}</p>
            </div>
          </div>
        </Footer>
      </Layout>
      {/* <div className='xyz'>xyz</div> */}
      {/* <Avatar size={32*times} icon={<UserOutlined />} /> */}
      {/* ???????????? */}
    </div>
  );
};
export default App;
