import React from 'react'
import { MAIN_COLOR } from '@/constants'
import { Row, Col, Image } from 'antd'
import Pic_World_Map from '@/assets/images/sa/pic_worldmap.png'


export default function Help() {
  return (
    <div>
      <br/>
      <br/>
      <Row>
        <Col offset={1} span={5}>
          <div> America </div>
          <div style={{width:300}}> <hr/> </div>
          <div> 8217 44th Ave W</div>
          <div> Suite A</div>
          <div> Mukilteo, WA 98275 </div>
          <div> Email Corporate Offic</div>
          <div> T. 800.709.1400  </div>
          <div> F. 425.488.8155  </div>
        </Col>

        <Col span={10}>
         <Image src={Pic_World_Map} preview={false}  style={{position:'relative', top:30, left:-50
         }}/> 
        </Col>

        <Col span={7}>
          <div>China </div>
          <div style={{width:400}}> <hr/> </div>
          <div>北京市東城區東直門南大街</div>
          <div>9號華普花園A座2202室  </div>
          <div>Email China Office</div>
          <div>T. 010-84094122,23 </div>
          <div>F. 010-84094121    </div>
        </Col>

      </Row>
<br/>


      <Row>
        <Col offset={2} span={7}>
          <div>UK</div>
          <div style={{width:400}}> <hr/> </div>
          <div>SportsArt UK</div>
          <div>Sportsart House, Unit 2 | 3 Charnwood</div>
          <div>Business Park North Road</div> |
          <div>Loughborough | LE11 1LE</div>
          <div>Email UK Offic</div>
          <div>T. +44 1509274440</div>
          <div>SportsArt House, Unit 2 | 3 Charmwood</div>
          <div>Business Park </div>
        </Col>
        <Col span={7}>
          <div> Europe</div>
          <div style={{width:400}}> <hr/> </div>
          <div> Strada Cantonal 69a, CH-6534 San </div>
          <div> Vittore, Switzerland   </div>
          <div> Email Europe Office  </div>
          <div> T. +41 91 8273908    </div>
          <div> F. +41 91 8273910   </div>
        </Col>

        <Col span={7}>
          <div>Head Office </div>   
          <div style={{width:400}}> <hr/> </div>    
          <div>SportsArt Headquarters Taiwan</div>
          <div>No. 11, Gong Huan Rd. Tainan </div>
          <div>City, Taiwan Republic Of China </div>
          <div>Email Taiwan Headquarters </div>
          <div>T. +886 6 3840888 </div>
          <div>F. +886 6 3840999   </div>
        </Col>
      </Row>




    </div>



  )
}
