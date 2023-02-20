import React from 'react';
import { Row, Col, Button } from 'antd';
import { CaretDownOutlined, PlusOutlined } from '@ant-design/icons';
{
  /*
#333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色
*/
}
export default function management() {
  return (
    <div>
      <Row justify="space-evenly" style={{ marginTop: 20 }}>
        <Col>
          <span
            style={{
              backgroundColor: '#707070',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            搜尋機台序號
          </span>
          &thinsp;<span style={{ color: '#84bd00' }}> /&zwnj;/ </span>
          <span
            style={{
              backgroundColor: '#707070',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            搜尋俱樂部
          </span>
          &thinsp;<span style={{ color: '#84bd00' }}> /&zwnj;/ </span>
          <span
            style={{
              backgroundColor: '#707070',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            搜尋器材
          </span>
          &thinsp;<span style={{ color: '#84bd00' }}> /&zwnj;/ </span>
          <span
            style={{
              backgroundColor: '#707070',
              paddingLeft: 15,
              paddingRight: 15,
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            起始日期
          </span>
        </Col>
        <Col span={5}></Col>

        <Col>
          <Button
            style={{
              backgroundColor: 'red',
              borderRadius: 20,
              borderWidth: 0,
              color: 'white',
              transform: 'translateX(-30px)',
            }}
          >
            <PlusOutlined />
            刪除
          </Button>
          &nbsp;
          <Button style={{ borderRadius: 20, transform: 'translateX(-30px)' }}>
            <PlusOutlined />
            新增
          </Button>
        </Col>
      </Row>

      {/* 第三行 */}
      <Row justify="space-evenly" style={{ marginTop: 20 }}>
        <Col>
          機台序號 <CaretDownOutlined />
        </Col>
        <Col>
          機台名稱 <CaretDownOutlined />
        </Col>
        <Col>
          前次保養時間 <CaretDownOutlined />
        </Col>
        <Col>
          前次保養的距離 <CaretDownOutlined />
        </Col>
        <Col>設定保養提醒日期 15 天</Col>
      </Row>
    </div>
  );
}
