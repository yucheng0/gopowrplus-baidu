import React from 'react'
import {Row,Col, Button} from 'antd'
import {CaretDownOutlined,PlusOutlined} from '@ant-design/icons';

export default function management() {
  return (
    <div>
        
       <Row justify='space-evenly' style={{marginTop:20}}>
        <Col>
        搜尋機台序號
        </Col>
        <Col>
       <div style={{color:'#84bd00'}}>  /&zwnj;/ </div> 
        </Col>

        <Col>
        搜尋俱樂部
        </Col>


     
        <Col>
       <div style={{color:'#84bd00'}}>   /&zwnj;/ </div> 
        </Col>
        <Col>
        搜尋器材
        </Col>


        <Col>
       <div style={{color:'#84bd00'}}>   /&zwnj;/ </div> 
        </Col>
        <Col>
        起始日期
        </Col>

       </Row>
       {/* 第二行 */}
<Row justify='end' style={{marginTop:20, marginBottom:20}}>
    <Col>
    <Button style={{borderRadius:20, transform:"translateX(-30px)"}} > <PlusOutlined />新增 </Button>
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
        </div>
  )
}
