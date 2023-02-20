import { PageContainer } from '@ant-design/pro-components';
import { Access, useAccess, useModel } from '@umijs/max';
import { Button } from 'antd';

const AccessPage = () => {
  const access = useAccess();
  // 查詢初值
  const { initialState, loading, error, refresh, setInitialState } =
    useModel('@@initialState');

  // useEffect(()=>{
  //   //  refresh()
  //   setInitialState({
  //     ...initialState,
  //     name: 'admin' ,              // 設定身份的權限, 由伺服器端傳來
  //   })
  // },[])

  const setAdmin = () => {
    setInitialState({
      ...initialState,
      name: 'admin', // 設定身份的權限, 由伺服器端傳來
    });
  };

  const setUser = () => {
    setInitialState({
      ...initialState,
      name: 'user', // 設定身份的權限, 由伺服器端傳來
    });
  };

  console.log(initialState);

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access
        accessible={access.canSeeAdmin}
        fallback={<div> 我不是Admin 看不到啊！...... </div>}
      >
        <Button>只有 Admin 可以看到这个按钮 See</Button>
      </Access>
      <br />
      <Access
        accessible={access.canDelAdmin}
        fallback={<div> 我不是 Admin 看不到啊！...... </div>}
      >
        <Button>只有 Admin 可以看到这个按钮 del </Button>
      </Access>

      <br />
      <div>
       
        <Button onClick={setAdmin}> 設定Admin </Button>{' '}
      </div>
      <div>
       
        <Button onClick={setUser}> 設定User </Button>{' '}
      </div>
    </PageContainer>
  );
};

export default AccessPage;
