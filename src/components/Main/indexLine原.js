// 引入antd chart =>  https://v0-charts.ant.design/demos/global#%E5%A4%9A%E6%8A%98%E7%BA%BF%E5%9B%BE
import { useNavigate } from '@umijs/max';
import { useModel } from 'umi';
import { Pie, Line } from '@ant-design/plots';
import { Image, Row, Col, Button, Space, Table, Tag } from 'antd';
import { useState, useEffect } from 'react';
import request from 'umi-request';
const { Column, ColumnGroup } = Table;

// ICon
import {
  WifiOutlined,
  LeftCircleFilled,
  CodeSandboxCircleFilled,
  ConsoleSqlOutlined,
} from '@ant-design/icons';

// 引入圖像
import tinysawelllogo from '@/assets/images/sa/tinysawelllogo.svg';
import bxwifioff from '@/assets/images/sa/bx-wifi-off.svg';
import tools from '@/assets/images/sa/tools.svg';

import stickers from '@/assets/images/sa/stickers.jpg';
// 引入樣式
import '@/pages/Login/index.less';

export default function Main() {
  // document.title = "Menu";
  const navigate = useNavigate();
  const [chart, setChart] = useState(true);
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  const [charViewColor, setCharViewColor] = useState('white');
  const [listViewColor, setListViewColor] = useState('#84bd00');

  // const [charViewColor,setCharViewColor] = useState('#84bd00')

  const [data, setData] = useState([]);


  const columns = [
    {

      // title: 'Name',
      title: () => <div style={{ color: 'white' }}> Name </div>,

      dataIndex: 'name',
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      // title: 'Age',
      title: () => <div style={{ color: 'white' }}> Age </div>,

      dataIndex: 'age',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      // title: 'Address',
      title: () => <div style={{ color: 'white' }}> Address </div>,

      dataIndex: 'address',
      filters: [
        {
          text: 'London',
          // text: <div style={{color:'white'}}> London </div>,
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
      onFilter: (value, record) => record.address.indexOf(value) === 0,
    },
  ];
  const dataTable = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };









  useEffect(() => {
    asyncFetch();
  }, []);

  // 資料模擬可以用mock來做也行
  // 它有一個缺點, 實際用在產品上會有問題找不到資料
  const asyncFetchMock = () => {
    request
      // 使用mock 資料 GET /api/userdata 它是api
      .get('/api/userdata')
      .then(function (response) {
        setData(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // 使用public 的方法, 它是固定
  const asyncFetch = () => {
    request
      .get('./data.json')
      .then(function (response) {
        setData(response);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const config = {
    data,
    xField: 'hour',
    yField: 'value',
    seriesField: 'category',
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    // color: ['#1979C9', '#D62A0D', '#FAA219'],
    color: ['red', 'blue', 'white', 'yellow', 'pink'],
  };

  const charView = () => {
    setCharViewColor('#84bd00');
    setListViewColor('white');
  };
  const listView = () => {
    setCharViewColor('white');
    setListViewColor('#84bd00');
  };

  return (
    <div>
      {/* #333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色 */}

      <div>
        {/*   曲線圖檢視 */}
        <div
          style={{
            display: `${chart === true ? 'block' : 'none'}`,
            // display: 'block',
          }}
        >
          <Row justify="center">
            <Col span={16}>
              <Line {...config} />
            </Col>
          </Row>
        </div>

        {/* 列表檢視 */}
        <div
          style={{
            marginTop: 20,
            // display: `${chart === true ? 'none' : 'block'}`,
          }}
        >
          {/* 第3行先缺 */}
          {/* 第4行 */}
          <div
            style={{
              border: '1px solid white',
              fontSize: '20px',
              marginLeft: 50,
              marginRight: 50,
              marginTop: 15,
            }}
          >
            <Row justify="space-evenly">
              <Col>
                {/* <div className="shape"> */}
                <div>
                  <LeftCircleFilled
                    style={{
                      backgroundColor: 'green',
                      color: 'green',
                      borderRadius: '50%',
                    }}
                  />
                  &ensp;使用中
                </div>
              </Col>
              <Col>
                <div>
                  <LeftCircleFilled
                    style={{
                      backgroundColor: 'lightgray',
                      color: 'lightgray',
                      borderRadius: '50%',
                    }}
                  />
                  &ensp;休眠
                </div>
              </Col>
              <Col>
                <div>
                  <LeftCircleFilled
                    style={{
                      backgroundColor: 'orange',
                      color: 'orange',
                      borderRadius: '50%',
                    }}
                  />
                  &ensp;異常
                </div>
              </Col>

              <Col>
                <div>
                  <img src={bxwifioff} style={{ width: 20 }} />
                  &ensp;網路斷線
                </div>
              </Col>

              <Col>
                <div>
                  <img src={tools} style={{ width: 20 }} />
                  &ensp;保養
                </div>
              </Col>
            </Row>
          </div>

          {/* 第5行 */}
          <div style={{ marginTop: 15 }}>
            <Row justify="space-evenly">
              <Col>
                <div>編號 </div>
              </Col>

              <Col>
                <div>機台序號</div>
              </Col>

              <Col>
                <div>機台類別</div>
              </Col>

              <Col>
                <div>機台狀況</div>
              </Col>

              <Col>
                <div>網路狀況</div>
              </Col>

              <Col>
                <div>保養狀況</div>
              </Col>

              <Col>
                <div>狀態更新時間</div>
              </Col>

              <Col>
                <div>mac</div>
              </Col>

              <Col>
                <div>使用名稱</div>
              </Col>
            </Row>
          </div>
        </div>

        {/* 其它 */}
        <Table
          onRow={(r) => ({
            onClick: () => console.log(r.key),
            // style: {color:'white'}
            style: {color:'green'}
          })}
          columns={columns} dataSource={dataTable} onChange={onChange} />;
      </div>
    </div>
  );
}
