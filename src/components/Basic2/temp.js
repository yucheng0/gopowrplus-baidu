import { Layout, Row, Col, Image, Avatar } from 'antd';
import React from 'react';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import Frame from './frame.js';

import '@/constants';

const { Header, Footer, Sider, Content } = Layout;

const App = () => (
  <div>
    <Layout>
      <Layout>
        <header className={styles.body0}>
          <Row>
            <Col offset={1}>
              <div className={`${styles.bigfont} ${styles.maincolor}`}>
                累積綠能排名
              </div>
            </Col>
          </Row>
        </header>
      </Layout>

      <Layout>
        <Sider width={'50%'} className={styles.body1}>
          <div className={styles.maincolor}>
            <Row justify="start">
              <Col offset={2}> 男 </Col>
            </Row>

            {/* ======================= */}

            <Row justify="center">
              <Col span={11}>
                <Frame name="Paul Kuo" value="3968.06wh" />
              </Col>
              <Col span={11}>
                <Frame name="Paul Kuo" value="3968.06wh" />
              </Col>
            </Row>

            {/* 第3行  */}
            <Row justify="start">
              <Col offset={2}>
                <div className={styles.bigfont}>本月排行榜</div>
              </Col>
            </Row>

            <Row justify="start">
              <Col offset={2}> 男 </Col>
            </Row>
            <Row justify="center">
              <Col span={11}>
                <Frame name="Paul Kuo" value="3968.06wh" />
              </Col>
              <Col span={11}>
                <Frame name="Paul Kuo" value="3968.06wh" />
              </Col>
            </Row>
            {/* ==========產生綠能=============== */}
            <Row justify="start">
              <Col offset={2}>
                <div className={styles.bigfont}>產生綠能</div>
              </Col>
            </Row>
            <Row justify="center">
              <Col offset={2} span={11}>
                總綠能(Wh)
              </Col>
              <Col span={11}> 選擇日期區間</Col>
            </Row>

            {/* 從這裡處理 */}
            <Row justify="start">
              {/* 左邊區塊處理 */}
              <Col span={9} offset={2}>
                <Col span={22} className={styles.maincolorwithframe}>
                  {' '}
                  601,363.0
                </Col>
                {/* 處理今日/本週/全月 */}

                <Col>
                <Row> 

                  <Col span={7}> 今日 </Col>
                  <Col span={7}> 本週 </Col>
                  <Col span={7}> 全月 </Col>
                </Row>
              
               
                




                
                </Col>



              </Col>

              {/* 右邊區塊處理 */}

              <Col span={9} offset={2} className={styles.maincolorwithframe}>
                <Row>
                  <Col span={12}>開始</Col>
                  <Col span={12}>結束</Col>
                </Row>
                {/* 第2行 */}
                <Row>
                  <Col span={24}> 2222222 </Col>
                </Row>

                <Row>
                  <Col span={24}> 44444444 </Col>
                </Row>
              </Col>
            </Row>

            {/* 包起來 */}
            <Row justify="center">
              {/* 總綠能下面那一塊 */}
              <Col span={11} className={styles.maincolorwithframe}>
                601.363.0
              </Col>
              {/* ...... 選擇日期區間....  */}
              {/* <div className={styles.maincolorwithframe} style={{width:1000}}>  */}
              <Col span={11} className={styles.maincolorwithframe}>
                <Row>
                  <Col offset={2} span={10}>
                    開始
                    <Row>
                      <Col span={22} className={styles.maincolorwithframe}>
                        0
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    結束
                    <Col span={20} className={styles.maincolorwithframe}>
                      0
                    </Col>
                  </Col>
                  {/* <Col span={24}> yyyy </Col>
                  <Col span={24}> yyyy </Col> */}
                </Row>
              </Col>
              {/* </div> */}
            </Row>

            {/*  */}
            <Row justify="start">
              <Col offset={2} span={3}>
                今日
                <Row>
                  <Col
                    span={18}
                    className={styles.maincolorwithframe}
                    style={{ textAlign: 'center' }}
                  >
                    0
                  </Col>
                </Row>
              </Col>

              <Col span={3}>
                本週
                <Row>
                  <Col
                    span={20}
                    className={styles.maincolorwithframe}
                    style={{ textAlign: 'center' }}
                  >
                    0
                  </Col>
                </Row>
              </Col>
              <Col span={3}>
                本月
                <Row>
                  <Col
                    span={24}
                    className={styles.maincolorwithframe}
                    style={{ textAlign: 'center' }}
                  >
                    0
                  </Col>
                </Row>
              </Col>

              {/* <Col offset={2} span={10}> xxxx </Col> */}
            </Row>
          </div>
        </Sider>
        {/* ==================第2行============================= */}
        <Sider width={'50%'} className={styles.body3}>
          <Row>
            <Col>即時排名 累積排名</Col>
          </Row>
        </Sider>
      </Layout>
    </Layout>
    {/* <div className='xyz'>xyz</div> */}
    <Avatar size={16} icon={<UserOutlined />} />
  </div>
);

export default App;
