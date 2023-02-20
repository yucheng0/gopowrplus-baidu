import Reac, { useState,useRef } from 'react';
import { Col, Row, Button, Select, Input } from 'antd';
const { Option } = Select;
import styles from './index.less';
import {
  DEFAULT_BAND_24G,
  DEFAULT_ENCRYPTION24G,
  DEFAULT_SSID_24G,
  DEFAULT_PW_24G,
  DEFAULT_BAND_5G,
  DEFAULT_ENCRYPTION5G,
  DEFAULT_SSID_5G,
  DEFAULT_PW_5G,
  EAP_METHOD,
  EAP_INNER_METHOD,
  EAP_ID,
  EAP_PW,
  SG_IP_SWITCH,
  SG_IP,
  DEFAULT_RESET,
} from './constants.js';

export default function Tools() {
    const reference = useRef();
  let data = {
    BAND_24G: DEFAULT_BAND_24G,
    ENCRYPTION_24G: DEFAULT_ENCRYPTION24G,
    SSID_24G: '',
    PW_24G: '',
    //
    BAND_5G: DEFAULT_BAND_5G,
    ENCRYPTION_5G: DEFAULT_ENCRYPTION5G,
    SSID_5G: '',
    PW_5G: '',
    //
    EAP_METHOD: EAP_METHOD,
    EAP_INNER_METHOD: EAP_INNER_METHOD,
    EAP_ID: EAP_ID,
    EAP_PW: EAP_PW,
    SG_IP_SWITCH: SG_IP_SWITCH,
    SG_IP: SG_IP,
  };
  console.log('data object = ', data);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const bandSwitch24G = (value) => {
    console.log(`BAND_2.4G=${value}`);
    data = { ...data, BAND_24G: `${value}` };
    console.log('data=', data);
  };

  const encryption24G = (value) => {
    console.log(`ENCRYPTION_24G=${value}`);
    data = { ...data, ENCRYPTION_24G: `${value}` };
    console.log('data=', data);
  };

  //   獲取input 的輸入值
  const ssid24G = (e) => {
    console.log(`SSID_24G=${e.target.value}`);
    data = { ...data, SSID_24G: `${e.target.value}` };
    console.log('data=', data);
  };

  //   獲取input 的輸入值
  const pw24G = (e) => {
    console.log(`PW_24G=${e.target.value}`);
    data = { ...data, PW_24G: `${e.target.value}` };
    console.log('data=', data);
  };

  const bandSwitch5G = (value) => {
    console.log(`BAND_5G=${value}`);
    data = { ...data, BAND_5G: `${value}` };
    console.log('data=', data);
  };

  const encryption5G = (value) => {
    console.log(`ENCRYPTION_5G=${value}`);
    data = { ...data, ENCRYPTION_5G: `${value}` };
    console.log('data=', data);
  };

  //   獲取input 的輸入值
  const ssid5G = (e) => {
    console.log(`SSID_5G=${e.target.value}`);
    data = { ...data, SSID_5G: `${e.target.value}` };
    console.log('data=', data);
  };

  //   獲取input 的輸入值
  const pw5G = (e) => {
    console.log(`PW_5G=${e.target.value}`);
    data = { ...data, PW_5G: `${e.target.value}` };
    console.log('data=', data);
  };

  const sgIpSwitch = (value) => {
    console.log(`SG_IP_SWITCH=${value}`);
    data = { ...data, SG_IP_SWITCH: `${value}` };
    console.log('data=', data);
  };

  const sgIp = (value) => {
    console.log(`SG_IP=${value}`);
    data = { ...data, SG_IP: `${value}` };
    console.log('data=', data);
  };

  const reset = () => {
    console.log('你按了reset');
    data = {
      RESET: DEFAULT_RESET,
      BAND_24G: DEFAULT_BAND_24G,
      ENCRYPTION_24G: DEFAULT_ENCRYPTION24G,
      SSID_24G: DEFAULT_SSID_24G,
      PW_24G: DEFAULT_PW_24G,
      //
      BAND_5G: DEFAULT_BAND_5G,
      ENCRYPTION_5G: DEFAULT_ENCRYPTION5G,
      SSID_5G: DEFAULT_SSID_5G,
      PW_5G: DEFAULT_PW_5G,
      //
      EAP_METHOD: EAP_METHOD,
      EAP_INNER_METHOD: EAP_INNER_METHOD,
      EAP_ID: EAP_ID,
      EAP_PW: EAP_PW,
      SG_IP_SWITCH: SG_IP_SWITCH,
      SG_IP: SG_IP,
    };

    //   寫入值
    document.getElementById('ssid24g').value = DEFAULT_SSID_24G;
    document.getElementById('pw24g').value = DEFAULT_PW_24G;
    document.getElementById('ssid5g').value = DEFAULT_SSID_5G;
    document.getElementById('pw5g').value = DEFAULT_PW_5G;
    // 這3行
    let select = document.getElementById('band24g');
    // let select = document.getElementsByClassName('band24g')
    // console.log ('Ref', reference.current)
    console.log('select=', select);
    // 顯示目前選到的值
    //    console.log (select)
    // 改目前顯示值 -> Disable
    // select.value = 'Disable';

    //    console.log ('x=',select)

    //    console.log ('x=',x.select.Options[
  };

  // DownLoad 檔案...............................
  function downloadFile() {
    let fileName = 'SSIDPASS.bin';
    const data = getData();

    let blob = new Blob([data], {
      type: 'application/octet-stream',
    });

    let href = URL.createObjectURL(blob);

    // 從 Blob 取出資料

    // 建立一個子標千'a'
    let link = document.createElement('a');
    // 加了一個子標千'a' 在body的身上
    document.body.appendChild(link);
    // 超連結
    link.href = href;
    // 檔名
    link.download = fileName;
    // 執行a 的動作既是下載
    link.click();
  }

  function getData() {
    // console.log('d=', data['BAND_2.4G']);
    let s =
      'RESET=FALAS\n' +
      `BAND_2.4G=${data['BAND_24G']}\n` +
      `SSID_2.4G=${data['SSID_24G']}\n` +
      `PW_2.4G=${data['PW_24G']}\n` +
      `BAND_5.0G=${data['BAND_5G']}\n` +
      `SSID_5.0G=${data['SSID_5G']}\n` +
      `PW_5.0G=${data['PW_5G']}\n` +
      `EAP_METHOD=${data['EAP_METHOD']}\n` +
      `EAP_INNER_METHOD=${data['EAP_INNER_METHOD']}\n` +
      `EAP_ID=${data['EAP_ID']}\n` +
      `EAP_PW=${data['EAP_PW']}\n` +
      `SG_IP=${data['SG_IP']}\n`;
    return s;
  }

  return (
    <div>
      <Row>
        <Col>Version: v0.1</Col>
      </Row>
      <Row>
        <Col>
          <p>
            PROGRAM FUNCTION: Geneate a SSIDPASS.bin file for settin SA WELL+
            customized SSID, PW, EAP and designated SG IP
          </p>
        </Col>
      </Row>

      {/* BandSwitch2.4G */}
      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          BandSwitch2.4G
        </Col>
        <Col span={11}>
          <Select
            defaultValue="Enable"
            // style={{
            //   width: 120,

            // }}

            // className="band24g"
            id = "band24g"
            // ref = {reference}

            onChange={bandSwitch24G}
          >
            <Option value="Enable" style={{}}>
              Enable
            </Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Col>
      </Row>

      {/* Encryption2.4G */}
      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          Encryption2.4G
        </Col>
        <Col span={11}>
          <Select
            defaultValue="WPA/WPA2"
            style={{
              width: 120,
            }}
            onChange={encryption24G}
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Col>
      </Row>
      {/* SSID2.4G */}

      <Row style={{ marginTop: 10 }} justify="start">
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          SSID2.4G
        </Col>

        <Col span={11}>
          <Input placeholder="" onChange={ssid24G} id="ssid24g" />
        </Col>
      </Row>

      {/* Password2.4G */}

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          Password2.4G
        </Col>
        <Col span={11}>
          <Input placeholder="" onChange={pw24G} id="pw24g" />
        </Col>
      </Row>

      <br />
      {/* BandSwitch5G */}
      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          BandSwitch5G
        </Col>
        <Col span={11}>
          <Select
            defaultValue="Enable"
            style={{
              width: 120,
            }}
            onChange={bandSwitch5G}
          >
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Col>
      </Row>

      {/* Encryption5G */}
      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          Encryption5G
        </Col>
        <Col span={11}>
          <Select
            defaultValue="WPA/WPA2"
            style={{
              width: 120,
            }}
            onChange={encryption5G}
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Col>
      </Row>

      {/* SSID5G */}

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          SSID5G
        </Col>
        <Col span={11}>
          <Input placeholder="" onChange={ssid5G} id="ssid5g" />
        </Col>
      </Row>

      {/* Password5G */}

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          Password5G
        </Col>
        <Col span={11}>
          <Input placeholder="" onChange={pw5G} id="pw5g" />
        </Col>
        {/* <Col span={12}>
          EAP User Password  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <Input placeholder=""  />
        </Col> */}
      </Row>
      <br />
      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          EAP Method
        </Col>
        <Col span={11}>
          <Select
            defaultValue="None"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="None">None</Option>
            <Option value="TTLS">TTLS</Option>
            <Option value="PEAP">PEAP</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          EAP Inner Method
        </Col>
        <Col span={11}>
          <Select
            defaultValue="MSCHAP"
            style={{
              width: 120,
            }}
            onChange={handleChange}
          >
            <Option value="MSCHAPV">MSCHAPV</Option>
            <Option value="MSCHAPV2">MSCHAPV2</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          EAP User ID
        </Col>

        <Col span={11}>
          <Input placeholder="" />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          EAP User Password
        </Col>
        <Col span={11}>
          <Input placeholder="" />
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          SG(MiniPC) IP Switch
        </Col>
        <Col span={11}>
          <Select
            defaultValue="Disable"
            style={{
              width: 120,
            }}
            onChange={sgIpSwitch}
          >
            <Option value="Disable">Disable</Option>
            <Option value="Enable">Enable</Option>
          </Select>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', paddingRight: 30 }}
        >
          SG(MiniPC) IP
        </Col>
        <Col span={2}>
          <Input placeholder="" onChange={sgIp} />
        </Col>
        <span
          style={{ fontSize: 20, position: 'relative', top: -2, margin: 5 }}
        >
          .
        </span>
        <Col span={2}>
          <Input placeholder="" onChange={sgIp} />
        </Col>
        <span
          style={{ fontSize: 20, position: 'relative', top: -2, margin: 5 }}
        >
          .
        </span>
        <Col span={2}>
          <Input placeholder="" onChange={sgIp} />
        </Col>
        <span
          style={{ fontSize: 20, position: 'relative', top: -2, margin: 5 }}
        >
          .
        </span>
        <Col span={2}>
          <Input placeholder="" onChange={sgIp} />
        </Col>

        <Col offset={1}>eg: 192.168.0.2</Col>
      </Row>

      <br />
      <br />
      <Row>
        <Col
          offset={1}
          span={10}
          style={{ textAlign: 'right', marginRight: 30 }}
        >
          <button
            type="button"
            onClick={reset}
            style={{ border: 0, backgroundColor: 'lightgreen' }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                lineBreak: 'anywhere',
                paddingTop: 5,
                backgroundColor: 'lightgreen',
              }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp; RESET&nbsp;&nbsp;&nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp;&nbsp;TO &nbsp; &nbsp; &nbsp; &nbsp; DEFAULT
            </div>
          </button>
        </Col>
        <Col offset={1} span={10}>
          <button
            type="button"
            onClick={reset}
            style={{ border: 0, backgroundColor: 'orange' }}
          >
            <div
              style={{
                width: 80,
                height: 80,

                paddingTop: 25,
                lineBreak: 'anywhere',
                backgroundColor: 'orange',
                border: 0,
              }}
            >
              Submit
            </div>
          </button>
        </Col>
      </Row>
      <br />
    </div>
  );
}
