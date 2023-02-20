import { Space, Table, Tag } from 'antd';
import React from 'react';
import  './index.less'
const columns = [
  {
    className: "bg",
    // title: 'Name',
    title: () => <div style={{ color: 'white' }}> Name </div>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    className: "bg",
    // title: 'Age',
    title: () => <div style={{ color: 'white' }}> Age </div>,

    dataIndex: 'age',
    key: 'age',
  },
  {
    className: "bg",
    // title: 'Address',
    title: () => <div style={{ color: 'white' }}> Address </div>,
    dataIndex: 'address',
    key: 'address',
  },
  {
    className: "bg",
    // title: 'Tags',
    title: () => <div style={{ color: 'white' }}> Tags </div>,

    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';

          if (tag === 'loser') {
            color = 'volcano';
          }

          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    className: "bg",
    // title: 'Action',
    title: () => <div style={{ color: 'white' }}> Action </div>,

    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const App = () => <Table   onRow={(r) => ({
  onClick: () => console.log(r.key),
  style: {color:'white'}    //用對象的方式
})}

columns={columns} dataSource={data} className = "bg" />;

export default App;