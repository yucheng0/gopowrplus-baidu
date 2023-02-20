import { Button, Form, Input, Select } from 'antd';
import React from 'react';
const { Option } = Select;
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
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};







const App = () => {
  const [form] = Form.useForm();
 
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({
      note: 'Hello world!',
      gender: 'male',
    });
  };

// ########################################################################################

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










//#################################################

  return (
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
      <Form.Item
        name="note"
        label="Note"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="gender"
        label="Gender"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item
        noStyle
        shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
      >
        {({ getFieldValue }) =>
          getFieldValue('gender') === 'other' ? (
            <Form.Item
              name="customizeGender"
              label="Customize Gender"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : null
        }
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <Button htmlType="button" onClick={onReset}>
          Reset
        </Button>
        <Button type="link" htmlType="button" onClick={onFill}>
          Fill form
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;