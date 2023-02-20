import React from 'react'
import { useModel } from 'umi'
import { useState, useEffect } from 'react'
import { useNavigate } from '@umijs/max';
import { Button } from 'antd';

let fix = 3
export default function C1() {
  const [t,setT] = useState(1)

    console.log('我是T1')
    const navigate = useNavigate();

    // const { isLogin, setIsLogin } = useModel('auth', (ret) => ({
    //     isLogin: ret.isLogin,
    //     setIsLogin: ret.setIsLogin,
    // }));

    // useEffect(() => {
    //     setTimeout(() => {
    //         setIsLogin(true)
    //     }, 2000)
    // })
    const add = () =>{
      // setData (data+1)
      fix++;
    }
    
    const nv = () =>{
        navigate('/start',{replace:true})
      }
      const tx1 = () => {
        setT(Date())
      }
    return (
        <div>
          <Button onClick={nv}> Navigate to Start </Button>  
          <Button onClick={add}> +1  </Button>  
          <Button onClick={tx1}> test </Button>

          {console.log('T1的值 = ' ,fix)}

            
             </div>
    )
}