import salogo from '@/assets/images/sa/salogo.png';
import { SOCKET_URL } from '@/constants'; // https://yctmake.com:12349
import smallsawelllogo from '@/assets/images/sa/smallsawelllogo.png';

import { CodeSandboxCircleFilled, WarningOutlined } from '@ant-design/icons';

import useRWD from '@/components/useRWD';
import PubSub from 'pubsub-js';
import { CloseOutlined, GlobalOutlined } from '@ant-design/icons';
import {
  Alert,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Image,
  Modal,
} from 'antd';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Animate, AnimateGroup, AnimateKeyframes } from 'react-simple-animate';
import webSocket from 'socket.io-client';
import {
  FormattedMessage,
  setLocale,
  useModel,
  useNavigate,
  useIntl,
} from 'umi';
// import '@/pages/Login/index.less';
import styles from './index.less';
import { recordKeyToString } from '@ant-design/pro-components';
import { check, version } from 'prettier';
import { JsonSchemaForm } from '@antv/xflow-extension';
// import { transform } from 'typescript';
const { Option } = Select;
// let  global_globalGreen = 20 
// global_globalGreen = 20
let duration = {}

let ws = null

export default () => {

  console.log('我是Login.....')
  const intl = useIntl();
  let navigate = useNavigate();
  const [form] = Form.useForm();

  const [connect, setConnect] = useState(false)
  const [modelType, setModeltype] = useState(null)
  // 變數最好在前面定義比較好
  // const [ws, setWs] = useState(null);
  // console.log('ws status1', ws)   // undefined

  // const [animatePlayStatus, setAnimatePlayStatus] = useState('paused')
  const [animatePlayStatus, setAnimatePlayStatus] = useState('running');
  const [rememberChecked, setRememberChecked] = useState();
  // -------------------------------------------------------------------
  const [dOpen, setDOpen] = useState(false);
  const [send, setSend] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [close, setClose] = useState(false);
  const [lang, setLang] = useState(
    navigator.language.toLowerCase() || navigator.browserLanguage.toLowerCase(),
  ); //取得當下的語言
  let dlang =
    navigator.language.toLowerCase() || navigator.browserLanguage.toLowerCase();
  switch (dlang) {
    case 'zh-tw':
      dlang = '繁體';
      break;

    default:
      dlang = 'En';
  }

  const [dspLang, setDspLang] = useState(dlang);
  // {console.log (lang)}

  // 底下這個是ws保留全局用的
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  // 判斷是否有登入成功-->後續用
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));


  // 底下這個是advText保留全局用的
  const { advText, setAdvText } = useModel('advtext', (ret) => ({
    advText: ret.advText, // 傳來目前的值
    setAdvText: ret.setAdvText, // 傳來方法
  }));


  // 一進入組件載入時用的
  useEffect(() => {
    // console.log ('讀saclub_remenber = ', localStorage.getItem('saclub_remember'))
    if (localStorage.getItem('saclub_remember') === null) {
      // 強迫寫入
      localStorage.setItem('saclub_remember', 'false');
      // 清除記錄, 它會先從瀏灠器拿到所以我先delay一下再清它, 才會有效果
      setTimeout(() => {
        form.setFieldsValue({
          club_login_account1: '',
          club_login_password: '',
        });
      }, 1000);
    } else if (localStorage.getItem('saclub_remember') === 'true') {
      setRememberChecked(true);
    } else {
      setRememberChecked(false);
      console.log('清除記錄......');
      // 清除記錄, 它會先從瀏灠器拿到所以我先delay一下再清它, 時間要多少?1sec

      setTimeout(() => {
        form.setFieldsValue({
          club_login_account1: '',
          club_login_password: '',
        });
        console.log('清除記錄2......');
      }, 1000);
    }
  }, []);

  // 判斷是否有進入啟動的頁面
  const { isStart, setIsStart } = useModel('start', (ret) => ({
    isStart: ret.isStart,
    setIsStart: ret.setIsStart,
  }));

  // 偵測是否由login跳入, 若不是則跳往Login
  // useEffect(() => {
  //   console.log('isStart=', isStart);
  //   if (!isStart) navigate('/Login', { replace: true }); // 測試它正常要跳menu
  // }, []);

  // 利用Socketio來取得雲端送過來資料
  let uint8View = [];
  const _ws_on = () => {
    console.log('Client Socketio. successful');

    console.log("ws每次進入嗎?")


    // 監聽廣告文字返回值（統一管理）不要重複監聽, 
    ws.on('retClubGetAdvText', (msg) => {
      console.log('Basic1(login) ---> ret?1=', msg);
      const { data } = JSON.parse(msg);
      // 將它寫入顯示文字框內
      setAdvText(data); // ............????test
      PubSub.publish('retClubGetAdvText', data);


    });

    // Basic讀取資料
    ws.on('retClubPeriod', (msg => {
      // console.log("retclubperiod",msg)
      const jsonData = JSON.parse(msg)
      console.log('retClubPeriod = ', jsonData)
      PubSub.publish('retClubPeriod', jsonData);


    }))


    /* keepAlive 接收和傳送
    收到keepAlive 馬上回傳{status:1}
    */
    // ws.on('socketioKeepAlive', (msg) => {
    //   console.log ('socketioKeepAlive msg ',msg)
    //   ws.emit('retSocketioKeepAlive', JSON.stringify({ status: 1 }))
    // })
    // 系統Error
    ws.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
      /* 當Error 發生時,若之前沒有開啟則把它開啟
   但有一個條件是重新觸發是要false即初始狀態它才會被打開
    */
      // 直接跳到Error畫面
      navigate('/wserror', { replace: true });

      // ws.on('connect',(ret)=>{console.log('ok ======',ret)})
      // 重連接真的會調用它的
      ws.on('connect', function () {
        console.log('Login 組件--斷了後重連接......................');

        navigate('/Login', { replace: true });

        // socket connected
      });
      // error === false ?  setError(true)

      //  它會一直出現error因為retry的緣故
      // Modal.error({
      //   title: 'This is an error message',
      //   content: 'connect_error',
      // });
    });

    // Disconnect 尚未測試
    ws.on('Disconnect', function () {
      // document.write("Sorry, there seems to be an issue with the connection!");
      console.log('Sorry, there seems to be an issue with the connection!');
    });

    ws.on('message', (data) => {
      // console.log(`Rev client data = ${data}`);
      // 收到由後台傳來一組對象
      console.log('data=', data);
    });

    ws.on('retClubLogin', (data) => {
      // console.log(`Rev client data = ${data}`);
      // 收到由後台傳來一組對象
      console.log('retClubLogin =', data);
      const datax = JSON.parse(data);
      if (datax.status === 1) {
        console.log('Login successful');
        console.log('data Token = ', datax.saclub_accessToken);
        localStorage.setItem('saclub_accessToken', datax.saclub_accessToken);
        setIsLogin(true); // 這個是異步會出問題的
        //這個地方跳太快了, 你必須等一下才跳
        setTimeout(() => {
          navigate('/Menu', { replace: true }); // 測試它正常要跳menu
        }, 100);

        // navigate('/menu', { replace: true }); // 測試它正常要跳menu
        // navigate('/register', { replace: true });    // 測試它正常要跳menu
      } else {
        setError(true); //顯示錯誤對話框
        setClose(true); // 顯示關閉的x
        setSend(true); // 這個感覺沒有用
        console.log('Login Fail');

        // let str = 'This is an error messagexxxx'
        // 目前抓到的都是繁體沒有多國語言
        let str = intl.formatMessage({ id: 'error' });
        console.log('str=', str);

        Modal.error({
          title: 'This is an error message',
          content: 'Incorrect account or password',
        });
      }
    });

    // 授權的結果
    ws.on('retClubAuth', (data) => {
      console.log('retClubAuth --- data result=', data);
      if (JSON.parse(data).status === 1) {
        console.log('登入成功');
        setIsLogin(true); // 這個是異步會出問題的
        //這個地方跳太快了, 你必須等一下才跳
        setTimeout(() => {
          navigate('/Menu', { replace: true }); // 測試它正常要跳menu
        }, 100);

        // navigate('/register', { replace: true });    // 測試它正常要跳menu
      } else {
        // setError(true);   //顯示錯誤對話框
        // setClose(true);   // 顯示關閉的x
        // setSend(true);    // 這個感覺沒有用
        console.log('登入失敗');
      }
    });

    ws.on('modelType', (data) => {
      // console.log("modelType:", data)
      switch (data) {
        case 1:
          setModeltype('跑步機');
          break;

        case 12:
          // console.log ("綠能腳踏車")
          setModeltype('綠能腳踏車');
          break;
        case 13:
          // console.log ("綠能腳踏車")
          setModeltype('綠能橢圓機');
          break;

        default:
          console.log('都不是我認同的機型');
      }
    });

    ws.on('connectStatus', (data) => {
      console.log('connect_status = ', data);
      setConnect(data);
    });

    ws.on('queryconnection', (data) => {
      console.log('queryconnection 前端 = ', data);
      if (data === true) {
        setConnect('Connected');
      } else {
        setConnect('OffLine');
      }
    });

    ws.on('userprofile', (data) => {
      console.log('userprofile 前端 = ', data);
      setUserProfile(data);
    });


    ws.on('retClubGetAllFacilityData', (result) => {
      // let totalStat = 0;
      let green = JSON.parse(result)
      console.log('result????', green, new Date())
      // toFixed 固定小數點顯示的位數
      // global_globalGreen = (green.global * 1).toFixed(2)
      // 使用訂閱與發佈來讀取值嗎?
      // 發佈
      //  PubSub.publish('retClubGetAllFacilityData', green);
      PubSub.publish('retClubGetAllFacilityData', green);

      // setClubGreen((green.club*1).toFixed(2));

    });


  };


  // 測試keepAlive 用的方式
  // useEffect(() => {
  //    setWs(webSocket(SOCKET_URL));
  // }, []);
  // 這個真的很奇怪, 若我不砍一個再建一個它就會有重複的log雖然node看不出來, 但總覺得怪怪的
  // 同個連線但有重複監聽器on 同時被建立, 只要有被觸發它就會回2次
  // 你把它砍了重建原來的監聽器就斷了線其餘也不難理解是socket.on 的問題, 即監聽器被重建多次有那麼多
  useEffect(() => {
    // 沒有就建
    if (ws === null) {
      ws = webSocket(SOCKET_URL,{
        path: "/wsapi/",
        transports: [ "websocket" ] 
    }
        );
    }
    // 有了就先砍再建
    else {
      ws.close()
      ws = webSocket(SOCKET_URL,{
        path: "/wsapi/",
        transports: [ "websocket" ] 
    });
    }
    console.log('sucess connect!');
    setSocketio(ws); // 保存要全局變數供其它人使用
    // 它是異步需要時間處理等個10ms

    setTimeout(() => {
      // 設定監控器
      _ws_on();
      // 判斷是否曾經有登錄
      const data = localStorage.getItem('saclub_accessToken');
      console.log('dataY = ', data);
      if (data !== null) {
        const dataJson = JSON.stringify({ saclub_accessToken: data });
        ws.emit('clubAuth', dataJson);
      }
    }, 100);
  }, []);

  useEffect(() => {
    switch (lang) {
      case 'zh-tw':
        {
          console.log('每次都進來');
          setLocale('zh-TW', false);
          //  setDspLang('繁體')
        }
        break;

      case 'zh-cn': // 流灠器讀到的
        {
          setLocale('zh-CN', false);
          // setDspLang('簡體')
        }
        break;

      default: {
        setLocale('en-US', false);
        // setDspLang('En')
      }
    }
  }, []);

  // 針對螢幕尺寸
  const [windowX, setWindowsX] = useState(0);
  const [windowY, setWindowsY] = useState(0);
  // 針對元素尺寸
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const reference = useRef('initial value');
  //
  useEffect(() => {
    //  setState 如果在APP下馬上call 會造成錯誤要注意
    z(); // 載完之後才會執行這個，而且只會執行一次
    //呼叫螢幕的寬度位置

  }, []);

  const x = () => {
    setWindowsX(window.innerWidth);
  };
  const y = () => {
    setWindowsY(window.innerHeight);
  };

  function z() {
    try {
      if (reference.current !== null) {
        // 用ref方式直接去取得
        setClientX(reference.current.clientWidth);
        setClientY(reference.current.clientHeight);
      }
    }
    catch (err) {
      console.log('login 取不到clientWidth/clientHeight所發生error', err)

    }

  };

  useRWD(x, y);

  const change = () => {
    setIsLogin(true);
    // '/menu' 前面斜線不要忘了
    localStorage.setItem('name', 'yucheng');
    navigate('/Menu', { replace: true });
  };
  const noChange = () => {
    setIsLogin(false);
    // navigate("/home",{replace:true})
    // 有攔截器在裡面
    localStorage.removeItem('name');
    navigate('/Menu', { replace: true });
  };

  const onFinish = (values) => {
    console.log('Send Data', values);
    // 判斷有沒有記錄打勾 remember me
    console.log('values.remember = ', values.remember);
    localStorage.setItem('saclub_remember', rememberChecked);

    // setData(values)     // 傳送的資料

    // ws.emit('clubLogin', JSON.stringify(values));
    // 捕獲Error?????

    ws.emit('clubLogin', JSON.stringify(values));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const [play, setPlay] = useState(false);
  const [dsp, setDsp] = useState('none');
  const [dsp0, setDsp0] = useState('hidden');

  const checked = (evt) => {
    setRememberChecked(!rememberChecked);

    console.log('evt=', evt);
  };

  useEffect(() => {
    // 下面這個一次要有
    const t1 = setTimeout(() => {
      setPlay(true);
    }, 1000);

    // return ()=>{
    //   setPlay(false)
    // }
  }, []);

  useEffect(() => {
    // 下面這個一次要有
    const t1 = setTimeout(() => {
      setDsp('block');
      // setDsp('visible');
    }, 480);
  });

  // 整體暗100ms
  useEffect(() => {
    // 下面這個一次要有
    const t1 = setTimeout(() => {
      setDsp0('block');
      // setDsp('visible');
    }, 480);
  });

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setLocale(value, false); // 第2個參數無刷新頁面
    setLang(value);
    setDOpen(!dOpen);
  };

  const pressIcon = () => {
    console.log('press Icon');
    setDOpen(!dOpen);
  };

  // 服務條款
  const termsOfService = () => {
    navigate('/termsofservice', { replace: true });
  };
  // 隱私權
  const privacypolicy = () => {
    navigate('/privacypolicy', { replace: true });
  };

  return (
    <div
      style={
        {
          // zoom: `${ windowY/476*0.5}`,
          //  display:`${dsp}`
          // visibility:`${dsp}`,
        }
      }
    >
      {/* {console.log('x / y = ', windowX / windowY)} */}

      <div style={{ display: `${dsp0}` }}>
        {/* <GlobalOutlined /> */}
        <Row justify="end">
          <Col>
            <span style={{ marginTop: 20, color: 'red', textAlign: 'end' }}>
              <Select
                defaultValue={dspLang} //這個初值應該只會執行一次而已
                style={{
                  width: 120, // 方框的尺寸
                  color: 'white',
                }}
                onChange={handleChange}
                onClick={pressIcon}
                bordered={0}
                // defaultOpen = {dOpen} //默認打開
                open={dOpen}
                // suffixIcon = ""  //隱藏小箭頭
                // 設定ICON
                suffixIcon={
                  <div style={{ color: 'white', zoom: 1.2 }}>
                    <GlobalOutlined />
                  </div>
                }
              >
                <Option value="en-US">En</Option>
                <Option value="zh-CN">簡體</Option>
                <Option value="zh-TW">繁體</Option>
                {/* <Option value="disabled" disabled>
        Disabled
      </Option> */}
              </Select>
            </span>
          </Col>
        </Row>
        {/* ======== {clientX} {clientY} ===== */}

        {/* 計算這個大小是佔多少, 方便對齊中間 */}

        {/* {console.log('clientxy = ', clientX, clientY)}
      {console.log('Windowxy = ', windowX, windowY)} */}
        <div
          ref={reference}
          style={{
            marginTop: `${(windowY - clientY) / 2 > 10
              ? `${(windowY - clientY) / 2}px`
              : '10px'
              }`,
            // X 被放大, y 也會被放大就不行了

            zoom: `${windowX > 576 ? 1 : 0.7}`,
          }}
        >
          {/* SA Well+ Logo */}
          <Row justify="center">
            <Col>
              <div
                className={styles.uphrmove1}
                style={{
                  width: 448,
                  height: 59,
                  clipPath: `${dsp === 'block'
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(50% 0% 50% 0%)'
                    }`,
                  //  clipPath:`${element.style.MozAnimationPlayState ==='running' ? 'inset(0% 0% 0% 0%)': 'inset(50% 0% 50% 0%)'}`,
                  //  先把位置移位免得等一下一開始看到會跳躍的動作
                  transform: 'translateY(100px)',
                  //  (top, right, bottom, left)
                  // clipPath:"inset(40% 0% 40% 0%)"
                }}
              >
                <Image src={smallsawelllogo} preview={false} />
              </div>
            </Col>
          </Row>

          {/*===============  畫上水平線 ============= */}
          <Row justify="start">
            <Col span={24}>
              <div
                className={styles.uphrmove}
                style={{
                  MozAnimationPlayState: `${animatePlayStatus}`,
                  // position: 'absolute',
                  width: '100%',
                  height: 2,
                  // marginLeft: (windowX - 400) / 2,
                  marginTop: 30,
                  marginBottom: 20,
                  backgroundColor: '#84bd00',
                  // backgroundColor:'red',
                  clipPath: `${dsp === 'block'
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(50% 0% 50% 0%)'
                    }`,
                  transform: 'translateY(100px)',
                }}
              ></div>
            </Col>
          </Row>

          {/* <div> */}

          {/* ========== 這個是包起來要做動畫 =============== */}
          <Row justify="center">
            <Col>
              <div
                className={styles.inset}
                id="width"
                ref={reference}
                style={{
                  width: 400,
                  MozAnimationPlayState: `${animatePlayStatus}`,
                  clipPath: 'inset(50% 0% 50% 0%)',
                }}
              >
                <Form
                  name="basic"
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                  <Form.Item
                    style={{
                      color: 'black',
                      fontSize: 12,
                      // paddingLeft: 35,
                      paddingTop: 12,
                    }}
                    // label="Email"
                    name="club_login_account1"
                    rules={[
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your Email!',
                      },
                    ]}

                  // <FormattedMessage id="welcome" />
                  >
                    <Input
                      addonBefore={<FormattedMessage id="email" />}
                      size="large"
                    />
                  </Form.Item>
                  {/* -------------------------------- */}
                  <Form.Item
                    style={{
                      color: 'black',
                      fontSize: 12,
                      // paddingLeft: 35,
                      // paddingTop: 12,
                    }}
                    // label="Password"
                    name="club_login_password"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                      addonBefore={<FormattedMessage id="password" />}
                    />
                  </Form.Item>
                  {/* -------------------------- */}

                  <Form.Item
                    wrapperCol={{
                      offset: 0,
                      // span: 22,
                    }}
                  >
                    <Button
                      size="large"
                      type="primary"
                      htmlType="submit"
                      style={{ maxWidth: '100%', width: '100%' }}
                    >
                      {<FormattedMessage id="signin" />}
                    </Button>
                  </Form.Item>

                  <Form.Item
                    style={{
                      color: 'black',
                      fontSize: 12,
                      // paddingLeft: 35,
                      // paddingTop: 12,
                    }}
                    name="remember"
                    // valuePropName="checked"
                    wrapperCol={{
                      offset: 0,
                      span: 24,
                    }}
                  >
                    <Row justify="space-between">
                      <Col>
                        <div>
                          <Checkbox
                            style={{ color: 'white' }}
                            // 打勾不打勾由這個決定的
                            checked={rememberChecked}
                            // checked = {false}

                            onChange={checked}
                          >
                            <FormattedMessage id="rememberme" />
                          </Checkbox>

                          <span style={{ color: 'white' }}>|</span>

                          <Button
                            type="text"
                            style={{ color: 'white' }}
                            onClick={() => {
                              navigate('/forgot', { replace: true });
                            }}
                          >
                            {/* 忘記密碼 */}
                            <FormattedMessage id="forgotpassword" />
                          </Button>

                          <span style={{ color: 'white' }}>|</span>

                          <Button
                            type="text"
                            style={{ color: 'white' }}
                            onClick={() => {
                              navigate('/register', { replace: true });
                            }}
                          >
                            <FormattedMessage id="register" />
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </Form.Item>
                  {/* --------------------------------- */}
                </Form>
              </div>
            </Col>
          </Row>

          {/* </div> */}

          {/* ===========  畫下水平線 ===========  */}
          <Row justify="start">
            <Col span={24}>
              <div
                className={styles.dnhrmove}
                style={{
                  // MozAnimationPlayState:'paused',
                  MozAnimationPlayState: `${animatePlayStatus}`,

                  //  animation-play-state: paused,
                  // position: 'absolute',
                  width: '100%',
                  height: 2,
                  // marginLeft: (windowX - 400) / 2,
                  // marginTop: windowY * 0.35,
                  backgroundColor: '#84bd00',
                  clipPath: `${dsp === 'block'
                    ? 'inset(0% 0% 0% 0%)'
                    : 'inset(50% 0% 50% 0%)'
                    }`,
                  transform: 'translateY(-182px)',
                }}
              />
            </Col>
          </Row>
          {/* =================DOWNLOAD THE SA WELL+APP====================== */}
          {/* <Row justify="center">
        <Col>
          <div
            style={{
              color: 'white',
              // position: 'absoulte',
              // marginLeft: (windowX - clientX) / 2,
              marginTop: 20,
            }}
          >
            DOWNLOAD THE SA WELL+APP
          </div>
        </Col>
      </Row> */}
          <Row justify="center">
            <Col>
              <div
                style={{
                  color: 'white',
                  // position: 'absoulte',
                  // marginLeft: (windowX - clientX) / 2,
                  marginTop: 20,
                  marginBottom: 10, // 這個是最下方加了一個margin 防止在最下方切齊
                }}
              >
                <FormattedMessage id="agree" />
                {/* 服務條款 */}
                <span
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={termsOfService}
                >
                  &nbsp; <FormattedMessage id="termsofservice" /> &nbsp;
                </span>
                及
                <span
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={privacypolicy}
                >
                  {/* 隱私政策 */}
                  &nbsp; <FormattedMessage id="privacypolicy" /> &nbsp;
                </span>
              </div>
            </Col>
          </Row>
          {/* 下載圖示 */}
          {/* 這個方法會被render 2次 */}
          {/* {error && handelError()} */}
        </div>
      </div>
    </div>
  );
};
