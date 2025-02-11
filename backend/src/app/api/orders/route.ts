import axios from 'axios';
import { NextApiRequest } from 'next';
import { prisma } from '@/prisma-middleware';
// schemas
import { CreateOrderSchema } from './order.schema';
// helpers
import { apiHandler } from '@/helpers/api-handler.helper';
// constants
import { ORDER_STATUS_IDS, WEB_SOCKET_SERVER } from '@/constants/constants';

// CREATE ORDER
export async function createOrder(req: NextApiRequest) {
  const body = await new Response(req.body).json();
  const data = CreateOrderSchema.parse(body);
  const menuItemIds = data.menuItemIdsAndQuantities.map((item) => item.menuItemId);
  const menuItems = await prisma.menuItem.findMany({
    where: { id: { in: menuItemIds } },
  });
  const totalPrice = data.menuItemIdsAndQuantities.reduce((acc, { menuItemId, quantity }) => {
    const menuItem = menuItems.find((item) => item.id === menuItemId);
    return acc + (menuItem?.price || 0) * quantity;
  }, 0) ;
  const order = await prisma.order.create({
    data: {
      orderStatusId: ORDER_STATUS_IDS.PENDING,
      totalPrice,
      OrderItem: { create: data.menuItemIdsAndQuantities },
    },
    include: { status: true },
  });
  
  await axios.post(`${WEB_SOCKET_SERVER}/emit`, {
    event: 'orderUpdated',
    data: order
  });
  return order;
}

export const POST = apiHandler(createOrder);
