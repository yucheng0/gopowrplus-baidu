import { SOCKET_URL } from '@/constants';
import { useEffect, useState } from 'react';
import { useModel } from 'umi';

import { Button } from 'antd';
import webSocket from 'socket.io-client';
import { ConsoleSqlOutlined } from '@ant-design/icons';
export default function ListByBs(props) {
  // console.log("props = ",props)

  const { socketio, setSocketio } = useModel('socketio', (ret) => ({
    socketio: ret.socketio, // 傳來目前的值
    setSocketio: ret.setSocketio, // 傳來方法
  }));

  useEffect(() => {
    console.log('socketio = ', socketio);
  }, []);

  useEffect(() => {
    console.log('送出key = message , value= {props}');
    ws.emit('message', '123456');
  }, []);

  const [recvData, setRecvData] = useState({
    min: 0,
    sec: 0,
    distance: 0,
    calories: 0,
    speed: 0,
    energy: 0,
  });
  const { min, sec, distance, calories, speed, energy } = recvData;

  const [userProfile, setUserProfile] = useState({
    mac: '',
    userID: 'NoID',
    userPW: 'NoPassword',
    unit: 0,
    height: 0,
    weight: 0,
    age: 0,
    birthday_year: 0,
    birthday_month: 0,
    birthday_day: 0,
    gender: 0,
    stride: 0,
    userName: 'NoName',
  });

  // 解構出來
  const {
    mac,
    userID,
    userPW,
    unit,
    height,
    weight,
    age,
    birthday_year,
    birthday_month,
    birthday_day,
    gender,
    stride,
    userName,
  } = userProfile;

  const [w, setW] = useState();
  const [c, setC] = useState();
  const [a, setA] = useState();
  const [connect, setConnect] = useState('OffLine');
  const [modeltype, setModeltype] = useState(0);

  // 利用Socketio來取得雲端送過來資料
  let uint8View = [];
  const _ws_on = () => {
    console.log('Client Socketio. successful');
    socketio.on('message', (data) => {
      // console.log(`Rev client data = ${data}`);
      // 收到由後台傳來一組對象
      console.log('data=', data);
      setRecvData(data);
      // // // console.log('uint8View[1]',uint8View[1])
      // if (uint8View[1] * 1 === 0x72) {
      //   // console.log('收到真正的資料其餘我都不收')
      //   console.log("weight=", uint8View[3]);
      //   setW(uint8View[3]);
      //   // //  competition
      //   console.log("competition=", uint8View[4]);
      //   setC(uint8View[4]);
      //   // //  angle
      //   console.log("angle=", uint8View[5]);
      //   setA(uint8View[5]);

      //   // 不可用狀態存數組, 會報錯, 但這樣卻沒有報錯
      //   // setRecvData(uint8View);
      // }
    });

    socketio.on('modelType', (data) => {
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

    socketio.on('connectStatus', (data) => {
      console.log('status = ', data);
      setConnect(data);
    });

    socketio.on('queryconnection', (data) => {
      console.log('queryconnection 前端 = ', data);
      if (data === true) {
        setConnect('Connected');
      } else {
        setConnect('OffLine');
      }
    });

    socketio.on('userprofile', (data) => {
      console.log('userprofile 前端 = ', data);
      setUserProfile(data);
    });
  };

  const [ws, setWs] = useState();

  useEffect(() => {
    setWs(webSocket(SOCKET_URL));
  }, []);

  useEffect(() => {
    if (ws) {
      console.log('sucess connect!');
      // 設定監控器
      _ws_on();
    }
  }, [ws]);

  // 初值的設定, 這樣就不用<optin> select </option>
  const [recorder, setRecorder] = useState({
    Weight: 5,
    Competition: 1,
    Angle: 1,
  });

  async function sendData(Weight, Competition, Angle) {
    await fetch(SOCKET_URL, {
      method: 'POST',
      body: JSON.stringify({
        weight: Weight,
        competition: Competition,
        angle: Angle,
      }),
    });
  }

  const submit = () => {
    console.log('submit = ', { ...recorder });
    sendData(recorder.Weight, recorder.Competition, recorder.Angle);
  };

  const select = (event) => {
    // 這是此次的值
    console.log(event.target.value);
    console.log({ ...recorder });
    // 異步調用, 會收到先前的值
    setRecorder({ ...recorder, Model: event.target.value });
  };

  const selectWeight = (event) => {
    // 這是此次的值
    console.log(event.target.value);
    console.log({ ...recorder });
    // 異步調用, 會收到先前的值
    setRecorder({ ...recorder, Weight: event.target.value });
  };

  const selectCompetition = (event) => {
    // 這是此次的值
    console.log(event.target.value);
    console.log({ ...recorder });
    // 異步調用, 會收到先前的值
    setRecorder({ ...recorder, Competition: event.target.value });
  };

  const selectAngle = (event) => {
    // 這是此次的值
    console.log(event.target.value);
    console.log({ ...recorder });
    // 異步調用, 會收到先前的值
    setRecorder({ ...recorder, Angle: event.target.value });
  };

  const weightfunc = (w) => {
    // console.log("收到兒子傳來的重量值 = ", w);
    setRecorder({ ...recorder, Weight: w });
  };

  const competitionfunc = (c) => {
    // console.log("收到兒子傳來的次數 = ", c);
    setRecorder({ ...recorder, Competition: c });
  };

  const anglefunc = (a) => {
    // console.log("收到兒子傳來的角度 = ", a);
    setRecorder({ ...recorder, Angle: a });
  };

  const sendx = () => {
    // 測試Socket 給伺服器
    console.log('送出key = message , value= hello node.js');
    ws.emit('message', 'hello nodejs');
  };

  return (
    <>
      <Button onClick={sendx}>Send Server by Socketio</Button>
    </>
  );
}
