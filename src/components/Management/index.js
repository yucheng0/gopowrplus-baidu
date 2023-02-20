import React from 'react'
import {Row,Col, Button} from 'antd'
import {CaretDownOutlined,PlusOutlined} from '@ant-design/icons';

export default function Management() {
  return (
    <div>
       <Row justify='start' style={{marginTop:0}}>
        <Col offset={2}>
        帳號管理 
        <span style={{color:'#84bd00'}}>   /&zwnj;/ </span> 
        俱樂部資訊
        <span style={{color:'#84bd00'}}>   /&zwnj;/ </span> 
        第三方綁定
        </Col>
   
       </Row>
       {/* 第二行  --- 新增*/}
<Row justify='space-evently' style={{marginTop:0, marginBottom:10}}>
    <Col offset={20}>
    <Button style={{borderRadius:20, backgroundColor:"#707070", border:"0 solid white"}} > <span style={{transform:'translateY(1px)', textAlign:"center", color:"white"}}> <PlusOutlined />新增 </span> </Button>
    </Col>
</Row>
       {/* 第三行 */}
        <Row justify='space-evenly'>
            <Col>
            帳號1 <CaretDownOutlined />
            </Col>
            <Col>
            帳號2 <CaretDownOutlined />
            </Col>
            <Col>
            身份 <CaretDownOutlined />
            </Col>
            <Col>
            暱稱 <CaretDownOutlined />
            </Col>
            <Col>
            最新登入時 <CaretDownOutlined />
            </Col>
        </Row>
        <Row justify='space-evenly'>
          <Col span={20}>
       <hr/>
          </Col>
        </Row>
        </div>
  )
}
