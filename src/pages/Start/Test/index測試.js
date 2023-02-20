import React from 'react'
import { useModel } from 'umi'
import { useState, useEffect } from 'react'
import { useNavigate } from '@umijs/max';

import { Button } from 'antd'
import C1 from '@/pages/Start/c1.js'
import C2 from '@/pages/Start/c2.js'
import T1 from '@/pages/T1'
import { setStatisticContainerStyle } from '@antv/g2plot/lib/utils/statistic'

let fix = 9
export default function Index() {
  console.log('...Start')


  const navigate = useNavigate();

  const [data,setData] = useState(1)
  const [t,setT] = useState(2)

  console.log('data =',data)
  console.log ('fix=',fix)
 
  const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    isLogin: ret.isLogin,
    setIsLogin: ret.setIsLogin,
  }));

  console.log (isLogin)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLogin(true)
  //   }, 2000)
  // })
  const ch = () =>{
    setIsLogin(true)
  }

const add = () =>{
  // setData (data+1)
  fix++;
}

const tx1 = () => {
  setT(Date())
}
const nv = () =>{
  navigate('/t1',{replace:true})
}
  return (
    <div>
<Button onClick={add}> +1 </Button>
<Button onClick={ch}> 改全局 </Button>
<Button onClick={tx1}> Test </Button>
<Button onClick={nv}> 導航到T1 </Button>
{console.log('Start的值 = ' ,fix)}
      <C1     fix={fix}  />
      <C2 />

    </div>
  )
}
