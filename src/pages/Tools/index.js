import Reac, { useState, useRef, useEffect } from 'react';
import {
  Col,
  Row,
  Button,
  Select,
  Input,
  Form,
  Modal,
  Image,
  InputNumber,
} from 'antd';
import {
  CloseCircleFilled,
  CodeSandboxCircleFilled,
  ConsoleSqlOutlined,
} from '@ant-design/icons';

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
    span: 12,
  },
};

const ipLayout = {
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
// 用Global 變數來處理所有的
let allData = {};
export default function Tools() {
  // Modal 模態框的處理
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  //
  const [form] = Form.useForm();
  // 不允許輸入(Diabled)的處理
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
  // ErroMessage 千萬不要用狀態去判斷, 要用一般Local 變數去判斷, 因為狀態是非同步的
  const [errorMessage, setErrorMessage] = useState([]);
  // 在判斷時是否有erro 發生
  let errorStatus = false;
  // ('') 是不顯示紅色叉叉的Icon, ('error') 是顯示Icon
  const [errorSSID24G, setErrorSSID24G] = useState('');
  const [errorPW24G, setErrorPW24G] = useState('');
  const [errorSSID5G, setErrorSSID5G] = useState('');
  const [errorPW5G, setErrorPW5G] = useState('');
  const [errorEapID, setErrorEapID] = useState('');
  const [errorEapPW, setErrorEapPW] = useState('');
  // 裡面存的是紅色叉叉的Icon, 不顯示用(null)代表
  // const [errorIP0, setErrorIP0] = useState(
  //   <CloseCircleFilled style={{ color: 'red' }} />,
  // );
  const [errorIP0, setErrorIP0] = useState('');
  const [errorIP1, setErrorIP1] = useState('');
  const [errorIP2, setErrorIP2] = useState('');
  const [errorIP3, setErrorIP3] = useState('');
  //
  useEffect(() => {
    initData();
  }, []);
  //  ------  函數的處理 ---------
  const initData = () => {
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
      form_sgip0: 0,
      form_sgip1: 0,
      form_sgip2: 0,
      form_sgip3: 0,
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
    setDisabledSGIP0(true);
    setDisabledSGIP1(true);
    setDisabledSGIP2(true);
    setDisabledSGIP3(true);
    //取消 ErrorICon 顯示
    setErrorSSID24G('');
    setErrorPW24G('');
    setErrorSSID5G('');
    setErrorPW5G('');
    //
    setErrorIP0('');
    setErrorIP1('');
    setErrorIP2('');
    setErrorIP3('');
  };
  // 值改變的處理程序
  const bandSwitch24G = (value) => {
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
  //
  const encryption24G = (value) => {
    if (value === 'None') {
      setDisabledPW24G(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({ form_pw24g: '' });
    } else {
      form.setFieldsValue({ form_encryption24g: 'WPA/WPA2' }); // 將ssid24g值設成空的
      setDisabledPW24G(false); //設定不能按（Disabled)
    }
  };
  //
  const bandSwitch5G = (value) => {
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
  //
  const encryption5G = (value) => {
    if (value === 'None') {
      setDisabledPW5G(true); //設定不能按（Disabled)
      //
      form.setFieldsValue({ form_pw5g: '' });
    } else {
      form.setFieldsValue({ form_encryption5g: 'WPA/WPA2' }); // 將ssid24g值設成空的
      setDisabledPW5G(false); //設定不能按（Disabled)
    }
  };
  //
  const eapmethod = (value) => {
    if (value === 'None') {
      setDisabledEapInnerMethod(true); //設定不能按（Disabled)
      setDisabledEapID(true); //設定不能按（Disabled)
      setDisabledEapPW(true); //設定不能按（Disabled)
      // 清除值
      form.setFieldsValue({
        form_eapinnermethod: '',
        form_eapid: '',
        form_eappw: '',
      });
    } else {
      // 設定初值
      form.setFieldsValue({
        form_eapinnermethod: 'MSCHAPV',
      });
      // 可以按了
      setDisabledEapInnerMethod(false);
      setDisabledEapID(false);
      setDisabledEapPW(false);
    }
  };
  //
  const sgIpSwitch = (value) => {
    if (value === 'Disable') {
      form.setFieldsValue({
        form_sgip0: 0,
        form_sgip1: 0,
        form_sgip2: 0,
        form_sgip3: 0,
      });
      //
      setDisabledSGIP0(true);
      setDisabledSGIP1(true);
      setDisabledSGIP2(true);
      setDisabledSGIP3(true);
      // 是否清除Error Icon?
      setErrorIP0('');
      setErrorIP1('');
      setErrorIP2('');
      setErrorIP3('');
    } else {
      setDisabledSGIP0(false);
      setDisabledSGIP1(false);
      setDisabledSGIP2(false);
      setDisabledSGIP3(false);
    }
  };
  // 重置到預設值
  const onReset = () => {
    initData();
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
    // console.log('downloads allData =', allData);
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
    // console.log('allData=', allData);
    let s =
      'RESET= FALSE\n' +
      `BAND_2.4G=${allData.form_bandswitch24g}\n` +
      `SSID_2.4G=${allData.form_ssid24g}\n` +
      `PW_2.4G=${allData.form_pw24g}\n` +
      `BAND_5G=${allData.form_bandswitch5g}\n` +
      `SSID_5G=${allData.form_ssid5g}\n` +
      `PW_5G=${allData.form_pw5g}\n` +
      `EAP_METHOD=${allData.form_eapmethod}\n` +
      `EAP_INNER_METHOD=${allData.form_eapinnermethod}\n` +
      `EAP_ID=${allData.form_eapid}\n` +
      `EAP_PW=${allData.form_eappw}\n` +
      `SG_IP=${allData.form_sgip0}.${allData.form_sgip1}.${allData.form_sgip2}.${allData.form_sgip3}\n`;
    return s;
  }

  // 表單處理變數
  const onFinish = (values) => {
    // console.log(values);
    if (
      values.form_eapinnermethod === '' ||
      values.form_eapinnermethod === null ||
      values.form_eapinnermethod === undefined
    ) {
      values.form_eapinnermethod = 'None';
    }
    allData = values; // 暫存至allData Object
    let m = [];
    errorStatus = false; //初值
    // 取消所有的Error Icon 顯示
    setErrorIP0('');
    setErrorIP1('');
    setErrorIP2('');
    setErrorIP3('');
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
      }

      if (
        values.form_encryption24g === 'WAP/WAP2' &&
        (values.form_pw24g === undefined || values.form_pw24g === '')
      ) {
        errorStatus = true;
        // 後面的 紅色叉叉icon 要顯示
        setErrorPW24G('error');
        m = m.concat('Password 2.4G cannot be empty');
      }
    }

    // |BandSwtich 5G 判斷
    if (values.form_bandswitch5g === 'Enable') {
      if (values.form_ssid5g === undefined || values.form_ssid5g === '') {
        errorStatus = true;
        m = m.concat('SSID 5G cannot be empty');
        setErrorSSID5G('error');
      }

      if (
        values.form_encryption5g === 'WAP/WAP2' &&
        (values.form_pw5g === undefined || values.form_pw5g === '')
      ) {
        errorStatus = true;
        m = m.concat('Password 5G cannot be empty');
        setErrorPW5G('error');
      }
    }

    // EAP Mehod 判斷
    if (values.form_eapmethod !== 'None') {
      if (
        values.form_eapid === '' ||
        values.form_eapid === undefined ||
        values.form_eapid === null
      ) {
        setErrorEapID('error');
        errorStatus = true;
        errorStatus = true;
        m = [...m, 'EAP ID cannot be empty'];
      }

      if (
        values.form_eappw === '' ||
        values.form_eappw === undefined ||
        values.form_eappw === null
      ) {
        setErrorEapPW('error');
        errorStatus = true;
        errorStatus = true;
        m = [...m, 'EAP PW cannot be empty'];
      }
    }

    // SGIP 判斷
    if (values.form_sgipswitch === 'Enable') {
      console.log(form);
      console.log('form_sgip0=', values.form_sgip0);
      // 取得到ip 值 -> ip0
      if (
        values.form_sgip0 === '' ||
        values.form_sgip0 === undefined ||
        values.form_sgip0 === null
      ) {
        // 顯示錯誤icon
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        // setErrorIP0('error');
        errorStatus = true;
        m = [...m, 'The 1st position of the IP Address cannot be empty'];
      } else {
        setErrorIP0('');
      }

      // 取得到ip 值 -> ip1
      // console.log('refip_0=', refip_0.current.input.value);
      if (
        values.form_sgip1 === '' ||
        values.form_sgip1 === undefined ||
        values.form_sgip1 === null
      ) {
        // 顯示錯誤icon
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        // setErrorIP1('error');
        errorStatus = true;
        m = [...m, 'The 2nd position of the IP Address cannot be empty'];
      } else {
        setErrorIP1('');
      }

      // 取得到ip 值 -> ip2
      if (
        values.form_sgip2 === '' ||
        values.form_sgip2 === undefined ||
        values.form_sgip2 === null
      ) {
        // 顯示錯誤icon
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        // setErrorIP2('error');
        errorStatus = true;
        m = [...m, 'The 3rd position of the IP Address cannot be empty'];
      } else {
        setErrorIP2('');
      }

      // 取得到ip 值 -> ip3
      if (
        values.form_sgip3 === '' ||
        values.form_sgip3 === undefined ||
        values.form_sgip3 === null
      ) {
        // 顯示錯誤icon
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
        // setErrorIP3('error');
        errorStatus = true;

        m = [...m, 'The 4th position of the IP Address cannot be empty'];
      } else {
        setErrorIP3('');
      }

      // 不允許 IP Address = 0.0.0.0
      if (
        values.form_sgip0 === 0 &&
        values.form_sgip1 === 0 &&
        values.form_sgip2 === 0 &&
        values.form_sgip3 === 0
      ) {
        errorStatus = true;
        m = [...m, 'IP Address cannot be 0.0.0.0'];
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
      }

      // 判斷值的範圍IP 0~255
      if (values.form_sgip0 < 0 || values.form_sgip0 > 255) {
        errorStatus = true;
        m = [
          ...m,
          'The 1st position of the IP Address must be in the range 0 to 255',
        ];
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
      }

      if (values.form_sgip1 < 0 || values.form_sgip1 > 255) {
        errorStatus = true;
        m = [
          ...m,
          'The 2nd position of the IP Address must be in the range 0 to 255',
        ];
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
      }

      if (values.form_sgip2 < 0 || values.form_sgip2 > 255) {
        errorStatus = true;
        m = [
          ...m,
          'The 3rd position of the IP Address must be in the range 0 to 255',
        ];
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
      }

      if (values.form_sgip3 < 0 || values.form_sgip3 > 255) {
        errorStatus = true;
        m = [
          ...m,
          'The 4th position of the IP Address must be in the range 0 to 255',
        ];
        setErrorIP0(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP1(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP2(<CloseCircleFilled style={{ color: 'red' }} />);
        setErrorIP3(<CloseCircleFilled style={{ color: 'red' }} />);
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
      console.log('No erro occur.');
      // 啟動modal
      setIsModalOpen1(true);
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
    downloadFile();
  };

  const modalHandleCancel1 = () => {
    setIsModalOpen1(false);

    // 把value 傳出去
    // downloadFile(allData);
  };

  return (
    <div>
      <Row justify="center">
        <Col span={24} style={{ backgroundColor: 'gray', padding: 15 }}>
          <span>
            <Image src={Logo} width={150}></Image>
          </span>
        </Col>
      </Row>

      <Row>
        <Col style={{ marginLeft: 15, marginTop: 15 }}>
          <p>
            <span style={{ fontWeight: 'bold' }}>
              PROGRAM FUNCTION&nbsp;:&nbsp;
            </span>
            <span style={{ color: 'black' }}>
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
          <Select disabled={disabledEapInnerMethod}>
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
          <Select disabled={disabledSGIp} onChange={sgIpSwitch}>
            <Option value="Disable">Disable</Option>
            <Option value="Enable">Enable</Option>
          </Select>
        </Form.Item>

        {/* SGIP */}
        <Form.Item
          label={<div className={styles.labelStyle}>SG IP Address</div>}
        >
          <Row>
            <Col>
              <Form.Item
                {...ipLayout}
                colon={false}
                name="form_sgip0"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={255}
                  disabled={disabledSGIP0}
                  prefix={errorIP0}
                />
              </Form.Item>
            </Col>
            <span className={styles.dot} />

            {/* sgip1 */}
            <Col>
              <Form.Item
                colon={false}
                name="form_sgip1"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={255}
                  disabled={disabledSGIP1}
                  prefix={errorIP1}
                />
              </Form.Item>
            </Col>
            {/* 小數點的處理, css 已處理形狀了不用再點了 */}
            <span className={styles.dot} />

            {/* sgip2 */}
            <Col>
              <Form.Item
                colon={false}
                name="form_sgip2"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={255}
                  disabled={disabledSGIP2}
                  prefix={errorIP2}
                />
              </Form.Item>
            </Col>
            <span className={styles.dot} />

            {/* sgip3 */}
            <Col>
              <Form.Item
                colon={false}
                name="form_sgip3"
                rules={[
                  {
                    required: false,
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={255}
                  disabled={disabledSGIP3}
                  prefix={errorIP3}
                />
              </Form.Item>
            </Col>
            <Col>
              <p style={{ marginLeft: 15, position: 'relative', top: 6 }}>
                eg : 192.168.0.14
              </p>
            </Col>
          </Row>
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
                borderRadius: 3,
                boxShadow: '2px 2px lightgray',
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
                borderRadius: 3,
                boxShadow: '2px 2px lightgray',
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
        title="Info"
        open={isModalOpen1}
        onOk={modalHandleOk1}
        onCancel={modalHandleCancel1}
      >
        <p>
          <span style={{ fontWeight: 'bold' }}>
            {' '}
            Please make sure there is no SSIDPASS.bin file in the downloaded
            folder.
          </span>
        </p>
        <p>
          {' '}
          <span style={{ fontWeight: 'bold' }}>
            After downloading, please follow the steps below{' '}
          </span>{' '}
        </p>
        <p>1. Copy SSIDPASS.bin to the root directory of the USB Flash Disk.</p>
        <p>
          <blockquote>
            2. When the machine is powered on, insert the USB Flash Disk into
            the USB Port of the console, and the Green LED will turn on.
          </blockquote>
        </p>
        <p>
          3. Unplug the USB Flash Disk and wait for the WiFi Blue LED to light
          up, and then the WiFi Module will be reset at this time.
        </p>
        <p>4. Check whether the customer AP is connected to SA Well Plus</p>
      </Modal>

      <br />
    </div>
  );
}
