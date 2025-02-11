import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { api } from '~/lib/api';
import type { Order } from '~/types/models';

const WEB_SOCKET_SERVER = 'http://localhost:3001';
const socket = io(WEB_SOCKET_SERVER);

const useOrderUpdates = () => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await api.get('orders/lastOrder');
      setOrder(res);
    };

    fetchOrder();

    socket.on('orderUpdated', (updatedOrder) => {
      console.log('Pedido actualizado:', updatedOrder);
      setOrder(updatedOrder);
    });

    return () => {
      socket.off('orderUpdated'); // Cleanup al desmontar el componente
    };
  }, []);

  return order;
};

export default useOrderUpdates;
