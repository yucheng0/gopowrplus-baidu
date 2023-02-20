import React from 'react'
import {Row,Col, AutoComplete} from 'antd'
import {MAIN_COLOR} from '@/constants'
 
export default function About() {
  return (
    <div style={{marginTop:400}}> 
      <Row justify="center" align="bottom"> 
        <Col>   <h1 style={{color:MAIN_COLOR, fontWeight:'bold'}}>關於資訊 </h1> </Col>
    
      </Row>
     
      <Row justify="center"> 
        <Col>   力伽實業服務器閘道器軟體（ 純網頁版 v0） </Col>
      </Row>
     
      
       </div>
  )
}
