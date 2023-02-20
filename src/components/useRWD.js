import { useEffect, useState } from 'react';

const useRWD = (x, y) => {
  // {console.log(x)}
  // {console.log(y)}

  const [device, setDevice] = useState('');

  const handleRWD = () => {
    if (window.innerWidth > 768) {
      setDevice('PC');
      x();
      y();
    } else if (window.innerWidth > 576) {
      setDevice('tablet');
      x();
      y();
    } else {
      setDevice('mobile');
      x();
      y();
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleRWD); //建立一個監聽器
    handleRWD(); // 呼叫一次讓它動作一次
    return () => {
      //unmount
      window.removeEventListener('resize', handleRWD);
    };
  }, []); //mount 只執行一次

  return device;
};

export default useRWD;
