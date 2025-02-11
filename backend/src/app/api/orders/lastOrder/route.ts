import { prisma } from '@/prisma-middleware';
// helpers
import { apiHandler } from '@/helpers/api-handler.helper';

// GET ORDER
async function getLastOder() {
  const order = await prisma.order.findFirst({
    orderBy: { createdAt: 'desc' },
    include: { status: true },
  });
  return order;
}

export const GET = apiHandler(getLastOder);
