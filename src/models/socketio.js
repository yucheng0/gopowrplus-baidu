import { useState, useCallback, useEffect } from 'react';
import { request } from 'umi';

export default () => {
  const [socketio, setSocketio] = useState(null);
  
    return { socketio, setSocketio };
};