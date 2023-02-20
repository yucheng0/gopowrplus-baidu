import { useNavigate } from '@umijs/max';
import { Button } from 'antd';
import { useModel, Outlet  } from 'umi';
import { WifiOutlined , LeftCircleFilled} from '@ant-design/icons';
import tinysawelllogo from '@/assets/images/sa/tinysawelllogo.svg';
import bxwifioff from '@/assets/images/sa/bx-wifi-off.svg';
import tools from '@/assets/images/sa/tools.svg';

import stickers from '@/assets/images/sa/stickers.jpg';

import { Image, Row, Col } from 'antd';
import '@/pages/Login/index.less';

export default function Main() {
  const navigate = useNavigate();

  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  console.log(Outlet)
  
  return (

    // <div className="body0">
    <div className="body1">
      {/* <div style={{ color: 'white' }}> */}

      {/* name 的記錄是 = {localStorage.getItem('name')} */}
      {/* </div> */}
      {/*
#333F48 是深灰色
#707070 是淺灰色
#84bd00 是主色
*/}

      <div
        style={{
          backgroundColor: '#707070',
          marginTop: 5,
          marginLeft: 5,
          marginRight: 5,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        <Row justify="space-between" align="middle">
          <Col>
            <a href="https://www.w3schools.com" target="blank">
              <Image src={tinysawelllogo} width={206} preview={false} />
            </a>
          </Col>

          <Col>
            <Button type="text" className="header"
            onClick={()=>{
              navigate('/data', { replace: true });
           }}>
              運動機台資料
            </Button>
          </Col>
          <Col>
            <div style={{ color: '#84bd00', fontSize: 20 }}>   /&zwnj;/ </div>
          </Col>
          <Col>
            <Button type="text" className="header"
            onClick={()=>{
              navigate('/management', { replace: true });
           }}>
              管理員功能
            </Button>
          </Col>
          <Col>
            <div style={{ color: '#84bd00', fontSize: 20 }}>   /&zwnj;/ </div>
          </Col>
          <Col>
            <Button type="text" className="header"
            onClick={()=>{
              navigate('/error', { replace: true });
           }}>
              器材錯誤資料
            </Button>
          </Col>

          <Col>
            <div style={{ color: '#84bd00', fontSize: 20 }}>   /&zwnj;/ </div>
          </Col>

          <Col>
            <Button className="header" type="text"
            onClick={()=>{
              navigate('/maintain', { replace: true });
           }}>
              保養管理
            </Button>
          </Col>

          <Col>
            <div style={{ color: '#84bd00', fontSize: '20px' }}>   /&zwnj;/ </div>
          </Col>

          <Col>
            <Button type="text" className="header"
            onClick={()=>{
              navigate('/rank', { replace: true });
           }}>
                俱樂部排名
            </Button>
          </Col>

          <Col>
            <div className="doubleslash">   /&zwnj;/ </div>
          </Col>

          <Col>
            <Button type="text" className="header" onClick={()=>{
               navigate('/competition', { replace: true });
            }}>
              連線比賽
            </Button>
          </Col>

          <Col>
            <div style={{ color: '#84bd00', fontSize: 20 }}>   /&zwnj;/ </div>
          </Col>
          <Col>
            <Button
              className="header"
              type="text"
              onClick={() => {
                setIsLogin(false);
                localStorage.removeItem('saclub_accessToken');
                setTimeout(() => {
                  navigate('/Login', { replace: true });
                }, 100);
              }}
            >
              登出
            </Button>
          </Col>

          {/* <Col>
        <div style={{ color: 'white', fontSize: 20 , transform:'translateX(50px)'}}>力伽實業</div>
      </Col> */}

          {/* <Col>
        <div style={{ color: 'white', fontSize: 20, clipPath:'circle(30%)', transform:'translateY(-3px)'}}>
          <Image src={stickers} width={50}/>  
        </div>
      </Col> */}
        </Row>
      </div>


      {/* 引入其它的 */}
      <Outlet />
    </div>
  );
}
