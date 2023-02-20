import { useNavigate } from '@umijs/max';
import { useModel } from 'umi';
import { Pie } from '@ant-design/plots';
import { Image, Row, Col, Button } from 'antd';
import { useState } from 'react';
// ICon
import { WifiOutlined, LeftCircleFilled } from '@ant-design/icons';

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

  // 曲線資料定義
  const data = [
    {
      type: '綠能橢圓機',
      value: 27,
    },
    {
      type: '綠能跑步機',
      value: 25,
    },
    {
      type: '綠能腳踏車',
      value: 18,
    },
    {
      type: '三合一',
      value: 45,
    },
    {
      type: '綠能健身車',
      value: 10,
    },
    {
      type: '其他',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.9,
    label: {
      type: 'inner',
      offset: '-30%',
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: 'center',
      },
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div>
      {/* #333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色 */}
      {/*   曲線圖檢視 */}
      <Row justify="center">
        <Col style={{marginTop:50}} span={24}>
          <Pie {...config} />
        </Col>
      </Row>





    </div>
  );
}
