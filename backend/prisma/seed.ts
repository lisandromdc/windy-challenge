import { PrismaClient } from '@prisma/client';
// seed
import { menuItemsSeed } from './seed/menu-items.seed';
// import { ordersSeed } from './seed/orders.seed';
import { orderStatusesSeed } from './seed/order-statuses.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed process...');

  await clearDatabase();
  
  await Promise.all(
    menuItemsSeed.map(async (data) => {
      await prisma.menuItem.create({ data });
    })
  );
  await Promise.all(
    orderStatusesSeed.map(async (data) => {
      await prisma.orderStatus.create({ data });
    })
  );
  // await Promise.all(
  //   ordersSeed.map(async (data) => {
  //     await prisma.order.create({
  //       data: {
  //         id: data.id,
  //         totalPrice: data.totalPrice,
  //         orderStatusId: data.orderStatusId,
  //         OrderItem: { create: data.menuItems },
  //       }
  //     });
  //   })
  // );

  console.log('Seed data successfully created!');
}


async function clearDatabase() {
  console.log('Clearing database...');
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.orderStatus.deleteMany();
  await prisma.menuItem.deleteMany();
  console.log('Database cleared.');
}

  main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1); // Exit with failure
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
