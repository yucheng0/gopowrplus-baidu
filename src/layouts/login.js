import { Layout } from 'antd';
import { Outlet } from 'umi';
const { Header, Footer, Sider, Content } = Layout;

export default function home() {
  console.log(Outlet);
  return (
    <Layout className="layout">
      <Header style={{ color: 'red', fontSize: 40 }}>
       
        Layout Login .........{' '}
      </Header>
      <Content>
       
        <Outlet />{' '}
      </Content>
      <Footer> Copyright SA 2022</Footer>
    </Layout>
  );
}
