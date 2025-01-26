import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$use(async (params, next) => {
  if (params.model === 'Order' && (params.action === 'findUnique' || params.action === 'findMany')) {
    if (!params.args.include) {
      params.args.include = {};
    }
    params.args.include.status = true;
  }
  return next(params);
});

export { prisma };
