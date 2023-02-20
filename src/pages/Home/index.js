import Img_sportsart from '@/assets/images/sa/1.jpg';
import _Animation from '@/components/AnimationDemo';
import Guide from '@/components/Guide';
import { trim } from '@/utils/format';
import { PageContainer } from '@ant-design/pro-components';
import { useModel, useNavigate } from '@umijs/max';
import { Button, Image } from 'antd';
import { FormattedMessage } from 'umi';

import styles from './index.less';

const HomePage = () => {
  const { name } = useModel('global');
  const navigate = useNavigate();
  return (
    // 下面是背景色
    // <div style={{ backgroundColor: 'red' }}>
    // 下面是背景圖 cover, contain
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${Img_sportsart})`,
      }}
    >
      <PageContainer ghost className="bg">
        <div className={styles.container}>
          <Guide name={trim(name)} />
          <Image width={200} src={Img_sportsart} />

          {/* <div style={{width:100, backgroundImage:`url(${Img_sportsart})` }}> </div> */}
          <div
            style={{
              width: 100,

              // backgroundImage:`url(${Img_sportsart})`
            }}
          >
           
          </div>

          <_Animation />

          <div>
            <FormattedMessage id="welcome" />
          </div>

          <Button onClick={() => navigate('/login', { replace: true })}>
            按我跳轉去Login
          </Button>
        </div>
      </PageContainer>
    </div>
  );
};

export default HomePage;
