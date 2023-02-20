import { Divider, List, Typography ,Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import React from 'react';
const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const App = () => (
  <>  
    {/* <Divider orientation="left">Large Size</Divider> */}
    <List
    style={{ border:'1px solid #84bd00'}}
      size="large"
    //   header={<div>Header</div>}
    //   footer={<div>Footer</div>}
      bordered
      dataSource={data}
      renderItem={(item) => <List.Item style={{color:'#84bd00', fontSize:20 , fontWeight:'bold', border:'2px solid #84bd00'}}>{item}</List.Item>}
    />
    <Avatar size={64} icon={<UserOutlined />} />
  </>
);

export default App;