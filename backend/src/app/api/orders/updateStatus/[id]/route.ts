import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/prisma-middleware';
import { ORDER_STATUS_IDS, WEB_SOCKET_SERVER } from '@/constants/constants';
import { apiHandler } from '@/helpers/api-handler.helper';
import { ModelId } from '@/schemas/api.schemas';
import axios from 'axios';

async function updateOrderStatus(req: NextApiRequest, res: NextApiResponse) {
  // @ts-expect-error params is right
  const data = await res.params;
  const orderId = ModelId.parse(+data.id);

  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) return res.status(404).json({ error: 'Order not found' });

  if (order.orderStatusId >= ORDER_STATUS_IDS.DELIVERED) {
    return order;
  }

  // Update order status
  const updatedOrder = await prisma.order.update({
    where: { id: orderId },
    data: { orderStatusId: order.orderStatusId + 1 }
  });

  // Send event to WebSocket server
  await axios.post(`${WEB_SOCKET_SERVER}/emit`, {
    event: 'orderUpdated',
    data: updatedOrder
  });

  return updatedOrder;
}

export const PUT = apiHandler(updateOrderStatus);