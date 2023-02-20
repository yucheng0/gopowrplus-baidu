import React,{useEffect,useState} from 'react'
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Image, Avatar } from 'antd';
import '@/constants';

export default function Frame(props) {
  const [screenWidth,setScreenWidth] = useState(1920);
  const [screenHeight,setScreenHeight] = useState(1080);
  const [times,setTimes] = useState(1)

  useEffect(() => {
    setScreenWidth(screen.width);
    setScreenHeight(screen.height);
    setTimes(screen.width / 1920); // 以1920px為主去做的
  }, []);

    // {console.log(props)}
    const {name,value} = props;
    // {console.log(name, value)}:
  return (
    <Row justify="center">
    <Col span={20} className={styles.maincolorwithframe} style={{padding:`${9*times}px`,margin:`${3*times}px`}}>
      {/*決定整體對齊  */}
      <Row justify="start">
        <Col span={10}>
          <Avatar size={96*times} icon={<UserOutlined />} />
        </Col>
        {/* 這邊最好指定 */}
        <Col span={14}>
          <Row>
            {/* 感覺指的是整體 */}
            <Col span={18} style={{ textAlign: 'center' }}>
            <span style={{fontSize:`${20*times}px`}}> {name} </span>
            </Col>
            <Col span={18}>
              <div
                style={{
                  transform: 'scale(1.2,1.2)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}
              >
               <span style={{fontSize:`${28*times}px`}}> {value >=10000 ?  (value*1).toFixed(1): (value*1).toFixed(2)} </span>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  </Row>
  )
}
