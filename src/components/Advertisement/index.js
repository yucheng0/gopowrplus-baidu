import { Input, Button, Row, Col, Form, Modal } from 'antd';
import { Components } from 'antd/lib/date-picker/generatePicker';
import React, { useRef, useEffect, useState } from 'react';
import { Navigate, Outlet, useModel } from 'umi';
const { TextArea } = Input;
import { MAIN_COLOR } from '@/constants';
import styles from './index.less';
import { P } from '@antv/g2plot';
import { useNavigate } from '@umijs/max';
import { miniWindow } from '@antv/l7-utils';

const App = () => {
  // 全局變數socketio (注意入口一定要走路由login 才會取得到全局)
  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));
  const [form] = Form.useForm();
  const navigate = useNavigate()
  const reference = useRef();

    // 底下這個是advText保留全局用的
   const { advText, setAdvText } = useModel('advtext', (ret) => ({
    advText: ret.advText, // 傳來目前的值
    setAdvText: ret.setAdvText, // 傳來方法
  }));

  const [isModalOpen, setIsModalOpen] = useState(false)

  // 一進來就去讀取資料庫的廣告訊息
  useEffect(() => {
    const token = localStorage.getItem('saclub_accessToken');
    // 它可以直接送對象不用送token
    // console.log ('送出clubGetAdvText1')

      console.log ('送出clubGetAdvText1 (Advertisement設定內)')
      socketio.emit('clubGetAdvText', JSON.stringify({ saclub_accessToken: token }))

  }, [])


  PubSub.unsubscribe('retClubGetAdvText');
  PubSub.subscribe('retClubGetAdvText', (msg, data) => {
    console.log('datadata 監聽', data)
    form.setFieldsValue({
      form_advtext: data
    })
  });


  // 按修改
  const onModified = () => {
    // console.log(reference.current.value)
    // 取到Token 用localStorage 
    const token = localStorage.getItem('saclub_accessToken');
    socketio.emit
      ('clubSetAdvText', JSON.stringify({
        saclub_accessToken: token, data: document.getElementById('textarea').innerHTML
      }))

    // // 註冊 retretClubGetAdvText
    // // socketio.off('retClubGetAdvText')

    // socketio.on('retClubGetAdvText', msg => {
    //   console.log('retiiii=', msg)
    //   const { data } = JSON.parse(msg);
    //   console.log('dataxxx 將它寫入顯示文字框內= ', data)




    //   // 將它寫入顯示文字框內
    //   setAdvText(data)
    // form.setFieldsValue({
    //     form_advtext: data
    //   })
    // })


  
  };

  const onCancel = () => {
    console.log('OnCancel')
    navigate('/Login', { replace: true });

  }


  const fullscreen = () => {
    console.log('fullscreen');
    // element.requestFullscreen();

    let elem = document.getElementById('xxx');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
  };

  // 註冊 retretClubGetAdvText
  // socketio.on('retClubGetAdvText', msg => {
  //   console.log('retiiii=', msg)
  //   const { data } = JSON.parse(msg);
  //   console.log('dataxxx=', data)
  //   // 將它寫入顯示文字框內
  //   setAdvText(data)
  //   form.setFieldsValue({
  //     form_advtext: data
  //   })
  //   // 等一下再跳回

  // })

  // 註冊 retretClubSetAdvText
  socketio.on('retClubSetAdvText', msg => {
    // console.log('ret (clubSetAdvText)=', msg)
    console.log('ret (clubSetAdvText) --- JSON=', JSON.parse(msg))
    // console.log('ret (clubSetAdvText)=')
    const { status } = JSON.parse(msg)
    if (status === 1) {
      console.log("更新廣告成功")
      navigate('/Login', { replace: true });
    }
    else {
      console.log("更新廣告失敗")
      setIsModalOpen(true)
    }
  })

  // 設攔截器
  useEffect(() => {

    if (socketio === null) {
      console.log('socketio異常')
      navigate('/Login', { replace: true });
    }
  })



  const modalHandleOk = () => {
    setIsModalOpen(false)
  }


  const modalHandleCancel = () => {
    setIsModalOpen(false)
  }

  return (
   
    <div style={{width:'100%',height:`${screen.height-100}px`}}> 
      <div className={styles.center} id="xxx">
      <div >
        <Row justify="center">
          <Col style={{ color: MAIN_COLOR, marginBottom: 10, fontSize: 28 }}>廣告訊息</Col>
        </Row>
        {/* <TextArea rows={4} /> */}

        <Form
          name="basic"
          labelCol={{ span: 2 }}
          wrapperCol={{ offset: 1, span: 22 }}
          // initialValues={{ remember: true }}
          // onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            // label="Username"
            name="form_advtext"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <TextArea
              placeholder="maxLength is 200"
              maxLength={200}
              id="textarea"
              rows={10}
            />
          </Form.Item>
        </Form>

        {/* ..........TextArea end */}

        <Row justify="center">
          <Col>
            <Button type="primary" onClick={onModified}>
              修改
            </Button>
            <span> &nbsp;</span>
            <Button onClick={onCancel}> 取消 </Button>
          </Col>
        </Row>
        <br />
        <Row justify="center">
          <Col style={{ color: MAIN_COLOR }}>
            請在文字框內修改廣告訊息, 然後點擊 &quot;修改&quot; 按鈕
          </Col>
        </Row>
      </div>


      <br />
      <br />


      <Modal
        title="Modified Error!"
        open={isModalOpen}

        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        footer={[
          <Button key={0} onClick={modalHandleOk}>
            OK
          </Button>,
        ]}

      >
        {/* <p> Modified Error!  </p> */}
      </Modal>
      </div>
      </div>
  );
};

export default App;
