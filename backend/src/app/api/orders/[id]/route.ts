import { NextApiRequest } from 'next';
import { prisma } from '@/prisma-middleware';
// types
import { Context } from '@/types/api.types';
// helpers
import { apiHandler } from '@/helpers/api-handler.helper';
// schemas
import { ModelId } from '@/schemas/api.schemas';

// GET ORDER
async function getOder(req: NextApiRequest, { params }: Context<{ id: string }>) {
  const data = await params;
  const id = ModelId.parse(+data.id);
  const order = await prisma.order.findUnique({ where: { id } });
  console.log('ORDER', order);
  return order;
}

export const GET = apiHandler(getOder);
