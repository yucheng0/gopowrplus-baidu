import { Outlet } from 'umi';
import {Button} from 'antd'
export default function home() {
  console.log(Outlet);
  return (
    <>
    <div >
      <div style={{ color: 'red', fontSize: 40 }}> Layout Home ......... </div>
     <Button type="text"> hello </Button>


     <div>
        <Outlet />
      </div>
      </div>
    </>
  );
}
