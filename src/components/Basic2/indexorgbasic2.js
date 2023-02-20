import { Layout, Row, Col, Image, Avatar } from 'antd';
import React from 'react';
import styles from './index.less';
import { UserOutlined } from '@ant-design/icons';
import Frame from './frame.js';
import List from './list.js'

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
              <Col offset={2} span={11}> 男 </Col>
              <Col  span={11}> 女 </Col>
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
              <Col offset={2} span={11}> 男 </Col>
              <Col  span={11}> 女 </Col>
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
                  601,363.0
                </Col>
                {/* 處理今日/本週/全月 */}
                <Col>
                  <Row>
                    <Col span={7}>
                      今日
                      <Row>
                        <Col span={22} className={styles.maincolorwithframe}>
                          18.9
                        </Col>
                      </Row>
                    </Col>
                    <Col span={7}>
                      本週
                      <Row>
                        <Col span={22} className={styles.maincolorwithframe}>
                          37.9
                        </Col>
                      </Row>
                    </Col>
                    <Col span={9}>
                      全月
                      <Row>
                        <Col span={21} className={styles.maincolorwithframe}>
                          59.5
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Col>

              {/* 右邊區塊處理 */}

              <Col span={9} offset={2} className={styles.maincolorwithframe}>
                <Row>
                  <Col span={12}>
                    開始
                    <Row>
                      <Col span={22} className={styles.maincolorwithframe}>
                        0
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    結束
                    <Row>
                      <Col span={22} className={styles.maincolorwithframe}>
                        0
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* 第2行 */}
                <Row>
                  <Col span={24}> </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </Sider>
        {/* ==================第2行============================= */}
        <Sider width={'50%'} className={styles.body3}>
          <Row>
            <Col span={22}>即時排名 累積排名</Col>
            <Col span={22}  ><List/></Col>
            
          </Row>

        </Sider>
      </Layout>
    </Layout>
    {/* <div className='xyz'>xyz</div> */}
    <Avatar size={16} icon={<UserOutlined />} />
  </div>
);

export default App;
