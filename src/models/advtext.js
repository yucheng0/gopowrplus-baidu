import { useState } from 'react';

export default () => {
  const [advText, setAdvText] = useState('歡迎光臨力伽實業股份有限公司....Welcome to SportArt....欢迎光临时宝雅...');
  return { advText, setAdvText };
};
