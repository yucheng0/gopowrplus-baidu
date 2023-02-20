import styles from './index.less'
import salogo from '@/assets/images/sa/salogo.png';
import useRWD from '@/components/useRWD';
import { FormattedMessage, setLocale, useModel, useNavigate } from 'umi';
import PubSub from 'pubsub-js'
import { MAIN_COLOR } from '@/constants'

import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Modal,
} from 'antd';
import React, { useEffect, useState } from 'react';
import TextArea from 'antd/lib/input/TextArea';
const { Option } = Select;
const residences = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
          },
        ],
      },
    ],
  },
];
// 螢幕放大則尺寸變小 screen 變小 （巔倒）
// labelCol 上面文字那一行, 若它為24就會換行
const formItemLayout = {
  labelCol: {
    xs: {                   //screen < 576px  (手機)
      span: 24,   // 24   (換兩行顯示)
    },
    sm: {                 // screen ≥ 576px --> 768px (or up)
      span: 24, //???
    },
    md: {// screen ≥ 768px	
      span: 24
    },
    lg: {//screen ≥ 992px
      span: 24
    },
    xl: { //screen ≥ 1200px	
      span: 24
    },
    xxl: { //screen ≥ 1600px
      span: 24
    }
  },

  // wrapCol 包，裹 下面輸入框wrap那一行, 若它為24就會全長
  // 注意上方width 的設定值（要動態處理）
  wrapperCol: {
    xs: {//screen < 576px  (手機)
      span: 24,   //24
    },
    sm: { // screen ≥ 576px --> 768px (or up)
      span:24,
    },
    md: {// screen ≥ 768px	  (校正ipad mini)
      span: 24
    },
    lg: {//screen ≥ 992px  ( 校正next hub)
      span: 24
    },
    xl: { //screen ≥ 1200px	 ( 校正next hub max 1280x800 50%)
      span: 24
    },
    xxl: { //screen ≥ 1600px
      span: 24
    }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,   //24
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 0,  //6 ?????
    },
  },
};

const tailFormItemLayout1 = {
  wrapperCol: {
    xs: {
      span: 24,   //24
      offset: 0,
    },
    sm: {
      span: 16,   //16
      offset: 4,   // 4
    },
  },
};


const App = () => {
  const [screenWidth, setScreenWidth] = useState(screen.width)
  const [screenHeight, setScreenHeight] = useState(screen.height)
  let times = screen.width / 1920

  window.addEventListener('resize', () => {
    setScreenWidth(screen.width)
    setScreenHeight(screen.Height)
    // console.log('resize Width', screenWidth)
    // console.log('resize Height', screenHeight)
  }); //建立一個監聽器

  // 底下這個unsubscribew 很重要不然會收到兩筆資料
  PubSub.unsubscribe('clubRegisterResult');
  PubSub.subscribe('clubRegisterResult', (msg, data) => {
    console.log('msg=', msg)  // 解出clubResisterResult
    console.log('data=', data)  // 解出真正的data內容
  })

  useEffect(() => {
    // 設初值
    form.setFieldsValue({
      club_login_account2: "",
      // club_contact_name:"", ??????
      // club_contact_first_name:"",
      // club_contact_last_name:"",
      // club_email: "",
      // club_address: "",
      // club_tel: "",
      club_headquarter_name: "",
      club_advtext: "歡迎光臨力伽實業股份有限公司....Welcome to SportsArt....欢迎光临时宝雅..."
    })
  }, [])

  let navigate = useNavigate();
  // 全局變量必須從login進入才能正常
  const { socketio, setSocketio } = useModel('socketio', ret => (
    {
      socketio: ret.socketio,    // 傳來目前的值
      setSocketio: ret.setSocketio,   // 傳來方法
    }))

  useEffect(() => {
    console.log('socketio', socketio)
    if (socketio === null) {
      console.log("socketio = 我是null")
      navigate('/Login', { replace: true });    // 測試它正常要
    }
  }, [])


  // console.log ('socketio',socketio)
  // if (socketio===null){
  //   console.log ("我是null")
  // navigate('/Login', { replace: true });    // 測試它正常要
  // }

  const [successOpen, setSuccessOpen] = useState(false);
  const [failOpen, setFailOpen] = useState(false);

  const [form] = Form.useForm();

  // 表單傳送執行程序
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    // ???之後傳對象即可
    socketio.emit('clubReg', JSON.stringify(values))
    // socketio.emit('clubReg', values)

    // 註冊的回復結果 (回傳JSON)
    socketio.on('retClubReg', (data) => {
      console.log('retClubReg = ', data);
      const { status } = JSON.parse(data)
      if (status === 1) {
        console.log("註冊成功")
        // 顯示
        setSuccessOpen(true)

      }
      else {
        console.log("註冊失敗")
        setFailOpen(true)
      }
      // data 是對象Object 非JSON
      // PubSub.publish('clubRegisterResult', '註冊的狀態', '成功');
    });

  };  //onFinish end

  // 成功Modal 的處理
  const handleOkOnSuccess = () => {
    // close windows
    setSuccessOpen(false)
    navigate('/Login', { replace: true });
  }

  // 失敗Modal 的處理
  const handleOkOnFail = () => {
    // close windows
    setFailOpen(false)
    //  navigate('/Login', { replace: true });
  }

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));


  const preventBubble = (e) => {
    // console.log(e)
    e.preventDefault();
  };



  return (
    // <div>
    //         <Row justify="center">
    //     <Col>
    //     <div style={{fontSize: 40, color: MAIN_COLOR, margin: 3, fontWeight: 'bold', padding: 20}}> Club Account Registration</div>
    //     </Col>
    //   </Row>
    // </div>
    <div>

      <Row justify="center">
        <Col>
          <div style={{ fontSize: `${40*times}px`, color: MAIN_COLOR, margin: 3, fontWeight: 'bold', padding: 20 }}> Club Account Registration</div>
        </Col>
      </Row>
      <div
        id="width"
        // ref={reference}
        style={{
          marginTop: '0px',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 50,
          paddingRight:50,
          paddingTop: 50,
          // position: 'absolute',
          // marginLeft: (windowX - clientX) / 2,
          // marginTop: (windowY - clientY) / 2,
          // 註width 是要靠計算的不是自己取得的 (你可以取得最大的寬度, 用768手機尺寸就無法用了）
          // width 必須動態調整
          width: screenWidth*1 >= 576 ? screenWidth*0.6 :screenWidth ,        
          // height: 480,
          backgroundColor: 'white',
          // backgroundColor: 'transparent',
          borderRadius: 3,
          // justifyContent:"center",
          // alignItems:"center",
          // position:"relative"
          // textAlign:"center"
        }}
      >
        {/* <div style={{ textAlign: 'center', padding: 5, marginTop: 10, marginBottom: 10 }}> */}
        {/* <img src={salogo} width="200" /> */}
        {/* <div style={{ fontSize: 40, color: MAIN_COLOR, margin: 3, fontWeight: 'bold', padding: 20 }}> Club Account Registration</div>
      </div> */}
        {/* 表單開始 */}



        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ['zhejiang', 'hangzhou', 'xihu'],
            prefix: '86',
          }}
          scrollToFirstError
        >




          {/* 俱樂部名稱 */}
          <Form.Item
            name="club_name"
            // label="Club name"
            label={<div className={styles.labelStyle}>Club Name</div>}
            rules={[
              {
                type: 'string',
                message: 'The input is not valid String',
              },
              {
                required: true,
                message: 'Please input your String!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>


          {/* 登入帳號1 */}
          <Form.Item
            name="club_login_account1"
            // label="Login Account1"
            label={<div className={styles.labelStyle}>Login Account1</div>}
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 登入帳號2 */}
          <Form.Item
            name="club_login_account2"
            // label="Login Account2"
            label={<div className={styles.labelStyle}>Login Account2</div>}

            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: false,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 登入密碼 */}
          <Form.Item
            name="club_login_password"
            // label="Login Password"
            label={<div className={styles.labelStyle}>Login Password</div>}

            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
            ]}
            hasFeedback
          >
            <Input.Password
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/*確認密碼 ---- 怪怪的 */}
          <Form.Item
            name="confirm"
            // label="Confirm Password"
            label={<div className={styles.labelStyle}>Confirm Password</div>}

            dependencies={['club_login_password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('club_login_password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 選擇姓名*/}
          {/* <Form.Item
          // contact_last_name or contact_first_name
          name="club_contact_name"
          label="Contact name"
          rules={[
            {
              type: 'string',
              message: 'The input is not valid String',
            },
            {
              required: false,
              message: 'Please input your String!',
            },
          ]}
        >
          <Input />
        </Form.Item> */}

          {/* First Name & Last Name  */}
          <Form.Item
            // colon={false}
            label={
              <div className={styles.labelStyle}>
                <span style={{ position: 'relative', top: 8, fontSize: `${24*times}PX`, color: 'red', color: MAIN_COLOR }}>* </span>
                <span style={{ position: 'relative', top: -1, color: MAIN_COLOR }}>Contact Name </span>
              </div>
            }

          // rules={[
          //   {
          //     required: true,
          //     message: 'Please input your Name!',

          //   },
          //   // {
          //   //   type: 'string',
          //   //   message: 'The input is not valid String',
          //   // },
          // ]}

          >
            {/* 它會多出一行空格, 用marginBottom 把這一行處理掉 */}
            <Row style={{ marginBottom: -24 }}>

              <Col span={12}>
                <Form.Item
                  // {...ipLayout}
                  colon={false}
                  name="club_contact_first_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your First Name!',

                    },
                    // {
                    //   type: 'string',
                    //   message: 'The input is not valid String',
                    // },
                  ]}
                >
                  <Input
                    style={{ width: `${490*times}px` }}
                    placeholder='First Name'
                    // min={0}
                    // max={255}
                    // disabled={disabledSGIP0}
                    // prefix={errorIP0}
                    onPressEnter={preventBubble}
                    // onKeyDown={pressDotSgIp0}
                    controls={false}
                  />
                </Form.Item>
              </Col>

              {/* last_name  8*/}
              <Col span={8}>   
                <Form.Item
                  colon={false}
                  name="club_contact_last_name"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Last Name!',

                    },
                  ]}
                >
                  <Input
                    style={{ width: `${490*times}px` }}
                    placeholder='Last Name'
                    // min={0}
                    // max={255}
                    // disabled={disabledSGIP1}
                    // prefix={errorIP1}
                    onPressEnter={preventBubble}
                    // onKeyDown={pressDotSgIp1}
                    controls={false}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>






          {/* 連絡人信箱 */}
          <Form.Item
            // name="club_email"
            // label="E-mail"
            label={<div className={styles.labelStyle}>E-mail</div>}

            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>


          {/* 選擇地址 */}
          <Form.Item
            name="club_address"
            // label="Address"
            label={<div className={styles.labelStyle}>Address</div>}

            rules={[
              // {
              //   type: 'string',
              //   message: 'The input is not valid String',
              // },
              {
                required: true,
                message: 'Please input your Address!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 選擇電話 */}
          <Form.Item
            name="club_tel"
            // label="Tel"
            label={<div className={styles.labelStyle}>Tel</div>}

            rules={[
              // {
              //   type: 'string',
              //   message: 'The input is not valid String',
              // },
              {
                required: true,
                message: 'Please input your Tel!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 選擇總部 */}
          <Form.Item
            name="club_headquarter_name"
            // label="HeadQuarter name"
            label={<div className={styles.labelStyle}>HeadQuarter name</div>}

            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
              },
              {
                required: false,
                message: 'Please input your E-mail!',
              },
            ]}
          >
            <Input
              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* 俱樂部廣告訊息 */}
          <Form.Item
            name="club_advtext"
            // label="Advertisement Message"
            label={<div className={styles.labelStyle}>Advertisement Message</div>}

            tooltip="Input your message"
            rules={[
              {
                required: false,
                message: 'Please input your text!',
                whitespace: true,
              },
            ]}
          >
            <TextArea

              onPressEnter={preventBubble}
            />
          </Form.Item>

          {/* <Form.Item
          name="residence"
          label="Habitual Residence"
          rules={[
            {
              type: 'array',
              required: true,
              message: 'Please select your habitual residence!',
            },
          ]}
        >
          <Cascader options={residences} />
        </Form.Item> */}


          {/* <Form.Item
          name="gender"
          label="Gender"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="select your gender">
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item> */}

          {/* <Form.Item label="Captcha" extra="We must make sure that your are a human.">
          <Row gutter={8}>
            <Col span={12}>
              <Form.Item
                name="captcha"
                noStyle
                rules={[
                  {
                    required: true,
                    message: 'Please input the captcha you got!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              
            </Col>
            <Col span={12}>
              <Button>Get captcha</Button>
            </Col>
          </Row>
        </Form.Item> */}

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>


          <Form.Item {...tailFormItemLayout1}>

            <div style={{ display: 'flex' }}>
              <div style={{ flex: 2 }} > </div>
              <Button type="primary" htmlType="submit" style={{ flex: 1 }}>
                Register
              </Button>
              <div style={{ flex: 1 }} > </div>

              <Button style={{ flex: 1 }}
                onClick={() => {
                  navigate('/Login', { replace: true });
                }}
              >
                Cancel
              </Button>
              <div style={{ flex: 2 }} > </div>

            </div>
          </Form.Item>

          <Form.Item>

            {/* <div style={{margin:15}}> </div> */}
          </Form.Item>
        </Form>

        <Modal
          open={successOpen}
          title="Congratulations!"
          onOk={handleOkOnSuccess}
          // onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleOkOnSuccess}>
              OK
            </Button>
          ]}
        >
          <p>Register Successful.</p>
        </Modal>


        {/* --------------------------------- */}
        <Modal
          open={failOpen}
          title="Register Fail"
          onOk={handleOkOnFail}
          // onCancel={handleCancel}
          footer={[
            <Button key="submit" type="primary" onClick={handleOkOnFail}>
              OK
            </Button>
          ]}
        >
          <p> A user with the same name is already registered</p>
        </Modal>

      </div>
    </div>

  );
};

export default App;