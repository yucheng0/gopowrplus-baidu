import { Outlet } from 'umi';

export default function Test() {
  console.log(Outlet);
  return (
    <>
      <div style={{ color: 'red', fontSize: 40,zIndex:10 }}> Layout Home ......... </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
