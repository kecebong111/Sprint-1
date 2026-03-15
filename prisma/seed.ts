import { PrismaClient, TransactionType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding initial inventory...');

  const items = [
    {
      name: 'Ultra Milk 250ml',
      category: 'Milk',
      quantity: 100,
      unit: 'pcs',
      criticalThreshold: 20,
    },
    {
      name: 'Vidoran Vitamin C',
      category: 'Supplement',
      quantity: 50,
      unit: 'bottles',
      criticalThreshold: 10,
    },
    {
      name: 'Nestle Bear Brand',
      category: 'Milk',
      quantity: 15, // Below threshold
      unit: 'cans',
      criticalThreshold: 20,
    },
  ];

  for (const item of items) {
    const createdItem = await prisma.item.upsert({
      where: { name: item.name },
      update: {},
      create: item,
    });

    // Add initial transaction
    await prisma.transaction.create({
      data: {
        itemId: createdItem.id,
        type: TransactionType.IN,
        amount: item.quantity,
        reason: 'Initial stock seeding',
      },
    });
  }

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
