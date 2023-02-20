import Reac, { useState, useRef } from 'react';
import { Col, Row, Button, Select, Input, Form } from 'antd';
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

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

export default function Tools() {
  const formRef = useRef();
  const [form] = Form.useForm();
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

  const eapmethod = (value) => {
    console.log(`EAP_METHOD=${value}`);
    data = { ...data, EAP_METHOD: `${value}` };
    console.log('data=', data);
  };

  const eapinnermethod = (value) => {
    console.log(`EAP_INNER_METHOD=${value}`);
    data = { ...data, EAP_INNER_METHOD: `${value}` };
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
    // document.getElementById('ssid24g').value = DEFAULT_SSID_24G;
    // document.getElementById('pw24g').value = DEFAULT_PW_24G;
    // document.getElementById('ssid5g').value = DEFAULT_SSID_5G;
    // document.getElementById('pw5g').value = DEFAULT_PW_5G;

    console.log (form)
    form.setFieldValue({
      form_BandSwitch24G: 'Disable',
      // "BandSwitch2.4G": 'Disable' 
      form_ssig24g:'12345'

    })

    // 這3行
    // let select = document.getElementById('band24g');
    // let select = document.getElementsByClassName('band24g')
    // console.log ('Ref', reference.current)
    // console.log('select=', select);
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
      `BAND_5G=${data['BAND_5G']}\n` +
      `SSID_5G=${data['SSID_5G']}\n` +
      `PW_5G=${data['PW_5G']}\n` +
      `EAP_METHOD=${data['EAP_METHOD']}\n` +
      `EAP_INNER_METHOD=${data['EAP_INNER_METHOD']}\n` +
      `EAP_ID=${data['EAP_ID']}\n` +
      `EAP_PW=${data['EAP_PW']}\n` +
      `SG_IP=${data['SG_IP']}\n`;
    return s;
  }

  // 表單處理變數
  const onFinish = (values) => {
    console.log(values);
  };

  const onGenderChange = (value) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({
          // note: 'Hi, man!',
        });
        return;
      case 'female':
        form.setFieldsValue({
          // note: 'Hi, lady!',
        });
        return;
      case 'other':
        form.setFieldsValue({
          // note: 'Hi there!',
        });
    }
  };

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

      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        {/* BandSwitch2.4G */}
        <Form.Item
          name="form_BandSwitch24G"
          label="BandSwitch2.4G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={bandSwitch24G}
            defaultValue="Enable"
            // allowClear
          >
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Form.Item>

        {/* Encryption2.4G */}
        <Form.Item
          name=" Encryption2.4G"
          label=" Encryption2.4G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={encryption24G}
            defaultValue="WPA/WPA2"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Form.Item>

        {/* SSID2.4G */}

        <Form.Item
          name="form_ssig24g"
          label=" SSID2.4G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password2.4G */}

        <Form.Item
          name=" Password2.4G"
          label=" Password2.4G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* -------- BandSwitch5G  ----------*/}

        <Form.Item
          name="BandSwitch5G"
          label="BandSwitch5G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={bandSwitch5G}
            defaultValue="Enable"
            // allowClear
          >
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Form.Item>

        {/* Encryption5G */}

        <Form.Item
          name=" Encryption5G"
          label=" Encryption5G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={encryption5G}
            defaultValue="WPA/WPA2"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Form.Item>

        {/* SSID5G */}

        <Form.Item
          name=" SSID5G"
          label=" SSID5G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* Password2.4G */}

        <Form.Item
          name=" Password5G"
          label=" Password5G"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/*  EAP Method */}
        <Form.Item
          name="EAP_METHOD"
          label="EAP Method"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={eapmethod}
            defaultValue="None"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="TTLS">TTLS</Option>
            <Option value="PEAP">PEAP</Option>
          </Select>
        </Form.Item>

        {/*    EAP Inner Method */}
        <Form.Item
          name="EAP_INNER_METHOD"
          label="EAP Inner Method"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={eapinnermethod}
            defaultValue="MSCHAP"
            // allowClear
          >
            <Option value="MSCHAPV">MSCHAPV</Option>
            <Option value="MSCHAPV2">MSCHAPV2</Option>
          </Select>
        </Form.Item>

        {/* EAP ID*/}
        <Form.Item
          name="EAP_ID"
          label="EAP ID"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/* EAP　Password */}
        <Form.Item
          name="EAP_PW "
          label="EAP_PW"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        {/*  SG(MiniPC) IP Switch */}
        <Form.Item
          name="SG_IP_SWITCH"
          label="SG IP SWITCH"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={sgIpSwitch}
            defaultValue="Disable"
            // allowClear
          >
            <Option value="Disable">Disable</Option>
            <Option value="Enable">Enable</Option>
          </Select>
        </Form.Item>
      </Form>

      <Row style={{ marginTop: 10 }}>
        <Col
          offset={4}
          span={4}
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
