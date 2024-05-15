'use client';

import { WS_URL } from '@/helper/constants';
import { useCallback, useEffect, useState } from 'react';

export default function usePricesBySocket() {
  const [socketData, setSocketData] = useState<Record<string, unknown>[]>([]);

  const createWebSocket = useCallback(
    (onMessage: (msg: MessageEvent<any>) => void) => {
      const ws = new WebSocket(WS_URL);

      ws.onmessage = onMessage;

      ws.onclose = function () {
        console.log(
          'WebSocket closed. Attempting to reconnect in 3 seconds...'
        );
        setTimeout(() => {
          createWebSocket(onMessage);
        }, 3000);
      };

      ws.onerror = function (error) {
        console.error('WebSocket error:', error);
        ws.close();
      };

      return ws;
    },
    []
  );

  useEffect(() => {
    const onMessage = function (msg: MessageEvent<any>) {
      const cryptoArray = Object.entries(JSON.parse(msg.data)).map(
        ([key, value]) => ({ [key]: value })
      );
      setSocketData(cryptoArray);
    };

    const ws = createWebSocket(onMessage);
    return () => {
      ws.close();
    };
  }, [createWebSocket]);
  return { socketData };
}
