import React from 'react'
import { useModel } from 'umi'
import { useState, useEffect } from 'react'
import { useNavigate } from '@umijs/max';
import { CodeSandboxCircleFilled } from '@ant-design/icons';

export default function C1(props) {
    const {fix} = props
    console.log('props',props)
    console.log('我是c1')
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


    return (
        <div>
         {console.log ('C1---fix=',fix)}   
            
            c1
            
            
            </div>
    )
}