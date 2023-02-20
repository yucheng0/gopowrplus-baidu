import React from 'react'
import {
    FormattedMessage,
    setLocale,
    useModel,
    useNavigate,
    useIntl,
} from 'umi';

export default function Forgot() {
    let navigate = useNavigate();
    const back = () => {
        navigate('/Login', { replace: true }); // 測試它正常要跳Login
    }

    return (
        <>
            <div> Forgot Password Page</div>
            <button type='button' onClick={back} style={{color:'blue'}}> Press me Back</button>
        </>
    )
}
