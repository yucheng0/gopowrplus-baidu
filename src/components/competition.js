import {useState, useEffect, useRef} from 'react'
import {Row,Col,Button} from 'antd'
import useRWD from '@/components/useRWD';


export default function Competition() {

  // 針對螢幕尺寸

  const [windowX, setWindowsX] = useState(0);
  const [windowY, setWindowsY] = useState(0);
  // 針對元素尺寸
  const [clientX, setClientX] = useState(0);
  const [clientY, setClientY] = useState(0);
  const reference = useRef('initial value');
  //
  useEffect(() => {
    //  setState 如果在APP下馬上call 會造成錯誤要注意
    z(); // 載完之後才會執行這個，而且只會執行一次
  }, []);

  const x = () => {
    setWindowsX(window.innerWidth);
  };
  const y = () => {
    setWindowsY(window.innerHeight);
  };

  function z() {
    try {
    setClientX(reference.current.clientWidth);
    setClientY(reference.current.clientHeight);
    }
    catch (err) {
      console.log ('competition 取不到clientWidth/clientHeight所發生error', err)
    }
  };

  //呼叫螢幕的寬度位置
  useRWD(x, y);


  return (
    <div 
    style={{
      marginTop:
      `${((windowY-clientY-100)/2)>10 ? `${((windowY-clientY-100)/2)}px` : '10px'}`
    }}
      > 
  {console.log(windowX ,windowY)}

<div   ref = {reference}> 
<Row justify='center' align='center'> 
  <Col>
  <button type="button" onClick={()=>console.log("click")} style={{cursor:'pointer' , border:'3px solid #707070',borderRadius:30 , width:250,textAlign:"center", padding:'10px 0px', backgroundColor:'transparent'}}>設定比賽</button>
  {/* <Button>設定比賽</Button> */}
</Col>
</Row>

<Row justify='center' align='center'> 
  <Col>
  <button type="button" onClick={()=>console.log("click")} style={{cursor:'pointer' , border:'3px solid #707070',borderRadius:30 , width:250,textAlign:"center", padding:'10px 0px', backgroundColor:'transparent', marginTop:30}}> 觀看排程/比賽</button>
</Col>
</Row>

<Row justify='center' align='center'> 
  <Col>
  <button type="button" onClick={()=>console.log("click")} style={{cursor:'pointer' , border:'3px solid #707070',borderRadius:30 , width:250,textAlign:"center", padding:'10px 0px', backgroundColor:'transparent', marginTop:30}}>線上賽程加入</button>
</Col>
</Row>
</div>
</div>
  )
}
