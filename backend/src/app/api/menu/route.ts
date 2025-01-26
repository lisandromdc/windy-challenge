import { NextApiRequest } from 'next';
import { prisma } from '@/prisma-middleware';
// schemas
import { CreateMenuItemSchema } from './menu.schema';
// helpers
import { apiHandler } from '@/helpers/api-handler.helper';

// GET MENU
export async function getMenu() {
  return await prisma.menuItem.findMany();
}

// CREATE MENU ITEM
export async function createMenuItem(req: NextApiRequest) {
  const body = await new Response(req.body).json();
  const data = CreateMenuItemSchema.parse(body);
  const menuItem = await prisma.menuItem.create({ data });
  return menuItem;
}

export const POST = apiHandler(createMenuItem);
export const GET = apiHandler(getMenu);
