import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRandomOrder } from '../mock/mockApi';
import { realTimeUpdate } from '../features/orders/ordersSlice';

export const useRealTimeUpdates = (enabled = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!enabled) return;

    const intervalId = setInterval(() => {
      const updatedOrder = updateRandomOrder();
      if (updatedOrder) {
        dispatch(realTimeUpdate(updatedOrder));
      }
    }, Math.random() * 5000 + 5000); // 5-10 seconds

    return () => clearInterval(intervalId);
  }, [dispatch, enabled]);
};
