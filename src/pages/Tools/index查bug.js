import Reac, { useState, useRef, useEffect } from 'react';
import { Col, Row, Button, Select, Input, Form, Modal, Image } from 'antd';
import { CloseCircleFilled, CodeSandboxCircleFilled } from '@ant-design/icons';

import Logo from '@/assets/images/sa/sawelllogo.png';
// import Logo from '@/assets/images/sa/1.jpg';

const { Option } = Select;
import styles from './index.less';
import {
  DEFAULT_RESET,
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
  let allData = {};
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const formRef = useRef();
  const [form] = Form.useForm();

  const refip_0 = useRef();
  const refip_1 = useRef();
  const refip_2 = useRef();
  const refip_3 = useRef();

  // 不允許輸入的處理

  const [disabledBandSwitch24G, setDisabledBandSwitch24G] = useState(false);
  const [disabledcryption24G, setDisabledEncryption24G] = useState(false);
  const [disabledSSID24G, setDisabledSSID24G] = useState(false);
  const [disabledPW24G, setDisabledPW24G] = useState(false);
  // 5G 參數
  const [disabledBandSwitch5G, setDisableBandSwitch5G] = useState(false);
  const [disabledEncryption5G, setDisabledEncryption5G] = useState(false);
  const [disabledSSID5G, setDisabledSSID5G] = useState(false);
  const [disabledPW5G, setDisabledPW5G] = useState(false);
  //EAP

  const [disabledEapInnerMethod, setDisabledEapInnerMethod] = useState(true);
  const [disabledEapID, setDisabledEapID] = useState(true);
  const [disabledEapPW, setDisabledEapPW] = useState(true);
  const [disabledSGIp, setDisabledSGIp] = useState(false);
  const [disabledSGIP0, setDisabledSGIP0] = useState(true);
  const [disabledSGIP1, setDisabledSGIP1] = useState(true);
  const [disabledSGIP2, setDisabledSGIP2] = useState(true);
  const [disabledSGIP3, setDisabledSGIP3] = useState(true);

  // Error 的處理
  // 千萬不要用狀態去判斷, 要用一般Local 變數去判斷
  // const [error,setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([]);
  let errorStatus = false;
  // ('') 是不顯示紅色叉叉的Icon, ('error') 是顯示Icon
  const [errorSSID24G, setErrorSSID24G] = useState('');
  const [errorPW24G, setErrorPW24G] = useState('');
  const [errorSSID5G, setErrorSSID5G] = useState('');
  const [errorPW5G, setErrorPW5G] = useState('');
  const [errorEapID, setEapID] = useState('');
  const [errorEapPW, setErrorEapPW] = useState('');
  // 裡面存的是紅色叉叉的Icon, 不顯示用(null)代表
  // const [errorIP0, setErrorIP0] = useState(
  //   <CloseCircleFilled style={{ color: 'red' }} />,
  // );
  const [errorIP0, setErrorIP0] = useState(null);
  const [errorIP1, setErrorIP1] = useState(null);
  const [errorIP2, setErrorIP2] = useState(null);
  const [errorIP3, setErrorIP3] = useState(null);

  // 初值設定
  useEffect(() => {
    form.setFieldsValue({
      form_bandswitch24g: 'Enable',
      form_encryption24g: 'WAP/WAP2',
      // form_ssid24g:'SportsArt_10',
      // form_pw24g:'sportsart063840888',
      //
      form_bandswitch5g: 'Enable',
      form_encryption5g: 'WAP/WAP2',
      // form_ssid5g:'SportsArt_10_5G',
      // form_pw5g:'00000000',
      //
      form_eapmethod: 'None',
      form_sgipswitch: 'Disable',
      // form_sgip:'0.0.0.0'
    });
  }, []);
  // ..............................................
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

  // 值改變的處理程序
  const bandSwitch24G = (value) => {
    console.log(`BAND_2.4G=${value}`);
    data = { ...data, BAND_24G: `${value}` };
    console.log('data=', data);
    if (value === 'Disable') {
      setDisabledEncryption24G(true); //設定不能按（Disabled)
      setDisabledSSID24G(true); //設定不能按（Disabled)
      setDisabledPW24G(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({ form_encryption24g: '' }); // 將ssid24g值設成空的
      form.setFieldsValue({ form_ssid24g: '' });
      form.setFieldsValue({ form_pw24g: '' });
    } else {
      form.setFieldsValue({ form_encryption24g: 'WPA/WPA2' }); // 將ssid24g值設成空的
      //
      setDisabledEncryption24G(false); //設定不能按（Disabled)
      setDisabledSSID24G(false); //設定不能按（Disabled)
      setDisabledPW24G(false); //設定不能按（Disabled)
    }
  };

  const encryption24G = (value) => {
    console.log(`ENCRYPTION_24G=${value}`);
    data = { ...data, ENCRYPTION_24G: `${value}` };
    console.log('data=', data);

    if (value === 'None') {
      setDisabledPW24G(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({ form_pw24g: '' });
    } else {
      form.setFieldsValue({ form_encryption24g: 'WPA/WPA2' }); // 將ssid24g值設成空的
      //

      setDisabledPW24G(false); //設定不能按（Disabled)
    }
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
    if (value === 'Disable') {
      setDisabledEncryption5G(true); //設定不能按（Disabled)
      setDisabledSSID5G(true); //設定不能按（Disabled)
      setDisabledPW5G(true); //設定不能按（Disabled)
      // 清除數值
      form.setFieldsValue({
        form_encryption5g: '',
        form_ssid5g: '',
        form_pw5g: '',
      });
    } else {
      form.setFieldsValue({ form_encryption5g: 'WAP/WAP2' });
      setDisabledEncryption5G(false); //設定可按
      setDisabledSSID5G(false);
      setDisabledPW5G(false);
    }
  };

  const encryption5G = (value) => {
    console.log(`ENCRYPTION_5G=${value}`);
    data = { ...data, ENCRYPTION_5G: `${value}` };
    console.log('data=', data);
    if (value === 'None') {
      setDisabledPW5G(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({ form_pw5g: '' });
    } else {
      form.setFieldsValue({ form_encryption5g: 'WPA/WPA2' }); // 將ssid24g值設成空的
      //

      setDisabledPW5G(false); //設定不能按（Disabled)
    }
  };

  const eapmethod = (value) => {
    console.log(`EAP_METHOD=${value}`);
    data = { ...data, EAP_METHOD: `${value}` };
    console.log('data=', data);

    if (value === 'None') {
      setDisabledEapInnerMethod(true);
      setDisabledEapID(true); //設定不能按（Disabled)
      setDisabledEapPW(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({
        form_eapinnermethod: '',
        form_eapid: '',
        form_eappw: '',
      });
    } else {
      form.setFieldsValue({
        form_eapinnermethod: 'MSCHAPV',
      });
      setDisabledEapInnerMethod(false);
      setDisabledEapID(false); //設定不能按（Disabled)
      setDisabledEapPW(false); //設定不能按（Disabled)
    }
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

  //

  //   獲取input 的輸入值
  const pw5G = (e) => {
    console.log(`PW_5G=${e.target.value}`);
    data = { ...data, PW_5G: `${e.target.value}` };
    console.log('data=', data);
  };

  const sgIpSwitch = (value) => {
    console.log(`SG_IP_SWITCH=${value}`);
    if (value === 'Disable') {
      let a = document.getElementById('id_ip0')
      a.value = 0;
      // document.getElementById('id_ip1').value = 0;
      // document.getElementById('id_ip2').value = 0;
      // document.getElementById('id_ip3').value = 0;

      // refip_0.current.setFieldsValue(10);
      // refip_0.current.input.value = '';
      // refip_1.current.input.value = '';
      // refip_2.current.input.value = '';
      // refip_3.current.input.value = '';

      // form.setFieldsValue({
      //   form_sgip0:'0',
      //   form_sgip1:'0',
      //   form_sgip2:'0',
      //   form_sgip3:'0',
      // })
      
      // console.log(refip_0.current.input.value)
      
      //
      setTimeout(()=>{
    //  setDisabledSGIP0(true);
      // setDisabledSGIP1(true);
      // setDisabledSGIP2(true);
      // setDisabledSGIP3(true);
      },500)
 

    } else {
      setDisabledSGIP0(false);
      setDisabledSGIP1(false);
      setDisabledSGIP2(false);
      setDisabledSGIP3(false);
    }
  };

  const sgIp = (value) => {
    console.log(`SG_IP=${value}`);
    data = { ...data, SG_IP: `${value}` };
    console.log('data=', data);
  };

  const onReset = () => {
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

    form.setFieldsValue({
      form_bandswitch24g: 'Enable',
      form_encryption24g: 'WAP/WAP2',
      form_ssid24g: 'SportsArt_10',
      form_pw24g: 'sportsart063840888',
      //
      form_bandswitch5g: 'Enable',
      form_encryption5g: 'WAP/WAP2',
      form_ssid5g: 'SportsArt_10_5G',
      form_pw5g: '00000000',
      //
      form_eapmethod: 'None',
      form_eapinnermethod: '',
      form_eapid: '',
      form_eappw: '',
      form_sgipswitch: 'disable',
      // form_sgip:'0.0.0.0'
    });

    // 設Eanbel
    setDisabledEncryption24G(false);
    setDisabledSSID24G(false);
    setDisabledPW24G(false);
    setDisabledSGIP0(false);
    setDisabledSGIP1(false);
    setDisabledSGIP1(false);
    setDisabledSGIP3(false);

    //
    setDisabledEncryption5G(false);
    setDisabledSSID5G(false);
    setDisabledPW5G(false);
    setDisabledEapPW(false);
    // 設定disable 不能選/不能輸入/不能按
    setDisabledEapInnerMethod(true);
    setDisabledEapID(true);
    setDisabledEapPW(true);
    //取消ErrorICon
    setErrorSSID24G(null);
    setErrorPW24G(null);
    setErrorSSID5G(null);
    setErrorPW5G(null);
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
  function downloadFile(values) {
    console.log('download=', values);
    console.log(`${values.form_bandswitch24g}\n`);
    // return
    let fileName = 'SSIDPASS.bin';
    const data = getData(values);

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

  function getData(values) {
    // console.log('d=', data['BAND_2.4G']);
    let s =
      'RESET= FALSE\n' +
      `BAND_2.4G=${values.form_bandswitch24g}\n` +
      `SSID_2.4G=${values.form_ssid24g}\n` +
      `PW_2.4G=${values.form_pw24g}\n` +
      `BAND_5G=${values.form_bandswitch5g}\n` +
      `SSID_5G=${values.form_ssid5g}\n` +
      `PW_5G=${values.form_pw5g}\n` +
      `EAP_METHOD=${values.form_eapmethod}\n` +
      `EAP_INNER_METHOD=${values.form_eapinnermethod}\n` +
      `EAP_ID=${values.form_eapid}\n` +
      `EAP_PW=${values.form_eappw}\n` +
      `SG_IP=${data['SG_IP']}\n`;
    return s;
  }

  // 表單處理變數
  const onFinish = (values) => {
    console.log(values);
    allData = values; // 暫存至allData Object
    let m = [];
    errorStatus = false; //初值
    //
    setErrorIP0(null);
    setErrorIP1(null);
    setErrorIP2(null);
    setErrorIP3(null);

    setErrorSSID24G('');
    setErrorPW24G('');
    setErrorSSID5G('');
    setErrorPW5G('');

    if (values.form_bandswitch24g === 'Enable') {
      if (values.form_ssid24g === undefined || values.form_ssid24g === '') {
        errorStatus = true;
        // 後面的 紅色叉叉icon 要顯示
        setErrorSSID24G('error');
        // m = m.concat('SSID 2.4G 不能為空')
        // 這個擴展函數也可以用
        m = [...m, 'SSID 2.4G cannot be empty'];

        console.log('SSID 2.4G cannot be empty');
      }

      if (
        values.form_encryption24g === 'WAP/WAP2' &&
        (values.form_pw24g === undefined || values.form_pw24g === '')
      ) {
        errorStatus = true;
        // 後面的 紅色叉叉icon 要顯示
        setErrorPW24G('error');
        m = m.concat('Password 2.4G cannot be empty');
        console.log('Password 2.4G cannot be empty');
      }
    }

    // 5G
    if (values.form_bandswitch5g === 'Enable') {
      if (values.form_ssid5g === undefined || values.form_ssid5g === '') {
        errorStatus = true;
        m = m.concat('SSID 5G cannot be empty');
        setErrorSSID5G('error');
        console.log('SSID 5G cannot be empty');
      }

      if (
        values.form_encryption5g === 'WAP/WAP2' &&
        (values.form_pw5g === undefined || values.form_pw5g === '')
      ) {
        errorStatus = true;
        m = m.concat('Password 5G cannot be empty');
        setErrorPW5G('error');
        console.log('Password 5G cannot be empty');
      }
    }

    // SGIP

    if (values.form_sgipswitch === 'Enable') {
      // 取得到ip 值 -> ip0
      console.log('refip_0=', refip_0.current.input.value);
      if (refip_0.current.input.value === '') {
        // 顯示錯誤icon
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        errorStatus = true;
        m = [...m, 'IP0 cannot be empty'];
        console.log('你未輸入值');
      }

      // 取得到ip 值 -> ip1
      // console.log('refip_0=', refip_0.current.input.value);
      if (refip_1.current.input.value === '') {
        // 顯示錯誤icon
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        errorStatus = true;
        m = [...m, 'IP1 cannot be empty'];
        console.log('你未輸入值');
      }

      // 取得到ip 值 -> ip2
      // console.log('refip_0=', refip_0.current.input.value);
      if (refip_2.current.input.value === '') {
        // 顯示錯誤icon
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        errorStatus = true;
        m = [...m, 'IP2 cannot be empty'];
        console.log('你未輸入值');
      }

      // 取得到ip 值 -> ip3
      // console.log('refip_0=', refip_0.current.input.value);
      if (refip_3.current.input.value === '') {
        // 顯示錯誤icon
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
        errorStatus = true;
        m = [...m, 'IP3 cannot be empty'];
        console.log('你未輸入值');
      }
    }

    // 總判斷:假如錯誤旗號打開則去啟動模態框去顯示,
    // 有即時性的判斷不要用狀態要用一般變數
    if (errorStatus === true) {
      console.log('有Error發生');
      // 把所有的錯誤寫入
      setErrorMessage(m);

      // 延遲1sec再處理
      setTimeout(() => {
        setIsModalOpen(true);
        console.log(errorMessage);
      }, 500);
    }
    // 沒有發生任何的錯誤
    else {
      console.log('沒有發生任何的錯誤, 可以寫檔了');

      // 啟動modal
      setIsModalOpen1(true);

      // 把value 傳出去
      // downloadFile(values);
    }
  };

  // 判斷ip數值
  const ip0 = (v) => {
    console.log(v.target.value);
    if (v.target.value > 255 || v.target.value < 0) {
      console.log('數值大於255 或數值<0');

      // refip_0.current.input = 255;
      console.log(refip_0.current);
    }
  };

  const modalHandleOk = () => {
    setErrorMessage([]);
    setIsModalOpen(false);
  };

  const modalHandleCancel = () => {
    setErrorMessage([]);
    setIsModalOpen(false);
  };

  const modalHandleOk1 = () => {
    setIsModalOpen1(false);

    // 把value 傳出去
    downloadFile(allData);
  };

  const modalHandleCancel1 = () => {
    setIsModalOpen1(false);

    // 把value 傳出去
    // downloadFile(allData);
  };

  return (
    <div>
      {/* <br /> */}
      {/* <Row>
        <Col>
          <div className={styles.labelStyle}>Test</div>{' '}
        </Col>
      </Row> */}
      <Row justify="center">
        {/* <Col span={24} style={{ backgroundColor: '#84bd00', padding: 15 }}> */}
        <Col span={24} style={{ backgroundColor: 'gray', padding: 15 }}>
          <span>
            <Image src={Logo} width={150}></Image>
          </span>
        </Col>
      </Row>
      {/* <Row justify="end">
        <Col style={{ marginRight: 15 }}>Version: v0.1</Col>
      </Row> */}
      <Row>
        <Col style={{ marginLeft: 15, marginTop: 15 }}>
          <p>
            <span style={{ fontWeight: 'bold' }}>
              PROGRAM FUNCTION&nbsp;:&nbsp;
            </span>
            <span>
              Geneate a SSIDPASS.bin file for setting SA WELL+ customized SSID,
              PW, EAP and designated SG IP
            </span>
          </p>
        </Col>
      </Row>

      <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        {/* BandSwitch2.4G */}
        <Form.Item
          colon={false}
          name="form_bandswitch24g"
          label={<div className={styles.labelStyle}>Band Switch 2.4G</div>}
          // initialValue="Enable"

          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledBandSwitch24G}
            // placeholder=""
            onChange={bandSwitch24G}
            // initialValues= "Enable"
            // allowClear
          >
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Form.Item>

        {/* Encryption2.4G */}
        <Form.Item
          colon={false}
          name="form_encryption24g"
          label={<div className={styles.labelStyle}>Encryption 2.4G</div>}
          // initialValue="WPA/WPA2"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledcryption24G}
            // placeholder=""
            onChange={encryption24G}
            // defaultValue="WPA/WPA2"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Form.Item>

        {/* SSID2.4G */}

        <Form.Item
          colon={false}
          name="form_ssid24g"
          label={<div className={styles.labelStyle}>SSID 2.4G</div>}
          validateStatus={errorSSID24G}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledSSID24G} />
        </Form.Item>

        {/* Password2.4G */}

        <Form.Item
          colon={false}
          name="form_pw24g"
          label={<div className={styles.labelStyle}>Password 2.4G</div>}
          validateStatus={errorPW24G}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledPW24G} />
        </Form.Item>

        {/* -------- BandSwitch5G  ----------*/}

        <Form.Item
          colon={false}
          name="form_bandswitch5g"
          label={<div className={styles.labelStyle}>Band Switch 5G</div>}
          // initialValue="Enable"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledBandSwitch5G}
            // placeholder=""
            onChange={bandSwitch5G}
            // defaultValue="Enable"
            // allowClear
          >
            <Option value="Enable">Enable</Option>
            <Option value="Disable">Disable</Option>
          </Select>
        </Form.Item>

        {/* Encryption5G */}

        <Form.Item
          colon={false}
          name="form_encryption5g"
          label={<div className={styles.labelStyle}>Encryption 5G</div>}
          // initialValue="WPA/WPA2"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledEncryption5G}
            // placeholder=""
            onChange={encryption5G}
            // defaultValue="WPA/WPA2"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="WPA/WPA2">WPA/WPA2</Option>
          </Select>
        </Form.Item>

        {/* SSID5G */}

        <Form.Item
          colon={false}
          name="form_ssid5g"
          label={<div className={styles.labelStyle}>SSID 5G</div>}
          validateStatus={errorSSID5G}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledSSID5G} />
        </Form.Item>

        {/* Password 5G */}

        <Form.Item
          colon={false}
          name="form_pw5g"
          label={<div className={styles.labelStyle}>Password 5G</div>}
          validateStatus={errorPW5G}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledPW5G} />
        </Form.Item>

        {/*  EAP Method */}
        <Form.Item
          colon={false}
          name="form_eapmethod"
          label={<div className={styles.labelStyle}>EAP Method</div>}
          // initialValue="None"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            // placeholder=""
            onChange={eapmethod}
            // defaultValue="None"
            // allowClear
          >
            <Option value="None">None</Option>
            <Option value="TTLS">TTLS</Option>
            <Option value="PEAP">PEAP</Option>
          </Select>
        </Form.Item>

        {/*    EAP Inner Method */}
        <Form.Item
          colon={false}
          name="form_eapinnermethod"
          label={<div className={styles.labelStyle}>EAP Inner Method</div>}
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledEapInnerMethod}
            // placeholder=""
            onChange={eapinnermethod}
            // initialValue="MSCHAPV"
            // allowClear
          >
            <Option value="MSCHAPV">MSCHAPV</Option>
            <Option value="MSCHAPV2">MSCHAPV2</Option>
          </Select>
        </Form.Item>

        {/* EAP ID*/}
        <Form.Item
          colon={false}
          name="form_eapid"
          label={<div className={styles.labelStyle}>EAP ID</div>}
          validateStatus={errorEapID}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledEapID} />
        </Form.Item>

        {/* EAP　Password */}
        <Form.Item
          colon={false}
          name="form_eappw"
          label={<div className={styles.labelStyle}>EAP Password</div>}
          validateStatus={errorEapPW}
          hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Input disabled={disabledEapPW} />
        </Form.Item>

        {/*  SG(MiniPC) IP Switch */}
        <Form.Item
          colon={false}
          name="form_sgipswitch"
          label={<div className={styles.labelStyle}>SG IP Address Switch</div>}
          // initialValue="Disable"
          rules={[
            {
              required: false,
            },
          ]}
        >
          <Select
            disabled={disabledSGIp}
            // placeholder=""
            onChange={sgIpSwitch}
            // defaultValue="Disable"
            // allowClear
          >
            <Option value="Disable">Disable</Option>
            <Option value="Enable">Enable</Option>
          </Select>
        </Form.Item>

        {/* SGIP */}
        <Form.Item
          colon={false}
          name="form_sgip"
          label={<div className={styles.labelStyle}>SG IP Address</div>}
          // 一次4個錯這樣子不行，錯誤才提示
          // validateStatus="error"
          // hasFeedback
          rules={[
            {
              required: false,
            },
          ]}
        >
          {/* <Input.Group compact className={styles.inputGroup}> */}
            <Input
              id="id_ip0"
              disabled={disabledSGIP0}
              style={{ width: '10%' }}
              className={styles.selfInput}
              ref={refip_0}
              maxLength={3}
              // suffix={errorIP0}
              type="number"
              onChange={ip0}
              // allowClear
              
              // showCount={true}
            />
            <span className={styles.dot}> </span>
            <Input
              id="id_ip1"
              disabled={disabledSGIP1}
              style={{ width: '10%', marginLeft: 10 }}
              className={styles.selfInput}
              ref={refip_1}
              maxLength={3}
              // allowClear
              // suffix={errorIP1}    //這一個有問題
              // type="number"
              // onChange={ip0}
            />
            <span className={styles.dot}></span>
            <Input
              id="id_ip2"
              disabled={disabledSGIP2}
              style={{ width: '10%', marginLeft: 10 }}
              className={styles.selfInput}
              ref={refip_2}
              maxLength={3}
              // suffix={errorIP2}
              type="number"
              // allowClear
            />
            <span className={styles.dot}></span>
            <Input
              id="id_ip3"
              disabled={disabledSGIP3}
              style={{ width: '10%', marginLeft: 10 }}
              className={styles.selfInput}
              ref={refip_3}
              maxLength={3}
              // suffix={errorIP3}
              type="number"
              // allowClear
            />
            <span style={{ marginLeft: 10 }}> eg: 192.168.0.14 </span>
          {/* </Input.Group> */}
        </Form.Item>




        {/* 按鍵 */}
        <Form.Item {...tailLayout}>
          <div>
            <div
              style={{
                color: 'black',
                cursor: 'pointer',
                width: 80,
                height: 80,
                backgroundColor: 'lightgreen',
                wordBreak: 'break-word',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 10,
              }}
              onClick={onReset}
            >
              RESET TO DEFAULT
            </div>
            <Button
              style={{
                position: 'relative',
                left: 100,
                top: -80,
                color: 'black',
                cursor: 'pointer',
                width: 80,
                height: 80,
                backgroundColor: 'orange',
                wordBreak: 'break-word',
                textAlign: 'center',
                paddingLeft: 10,
                paddingRight: 10,
              }}
              htmlType="submit"
              // onClick={onFinish}
            >
              <span style={{ position: 'relative', top: 0 }}>SUBMIT</span>
            </Button>
          </div>
        </Form.Item>
      </Form>

      <Modal
        title="Error !"
        open={isModalOpen}
        onOk={modalHandleOk}
        onCancel={modalHandleCancel}
        footer={[
          <Button key={0} onClick={modalHandleOk}>
            OK
          </Button>,
        ]}
      >
        {errorMessage.map((data, i) => (
          <ul key={i}>
            <li>{data}</li>
          </ul>
        ))}
      </Modal>

      <Modal
        title="Prompt !"
        open={isModalOpen1}
        onOk={modalHandleOk1}
        onCancel={modalHandleCancel1}
        // footer={[
        //   <Button key={0} onClick={modalHandleOk1}>
        //     OK
        //   </Button>,
        // ]}
      >
        請確認下載的資料夾中沒有SSIDPASS.bin檔 當下載後請依下列的步驟執行 1.
        開機 2. 當開機完成後, 約5sec 3. 將檔案放入隨身碟download 4. 插入隨身碟,
        待燈亮起
      </Modal>

      <br />
    </div>
  );
}
