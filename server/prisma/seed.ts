import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [
      {
        title: 'To Do',
        actions: [{ action: 'Created', updateAt: '2024-03-24T09:00:00Z' }],
      },
      {
        title: 'Planned',
        actions: [{ action: 'Created', updateAt: '2024-03-25T09:00:00Z' }],
      },
      {
        title: 'In Progress',
        actions: [{ action: 'Created', updateAt: '2024-03-23T09:00:00Z' }],
      },
      {
        title: 'Closed',
        actions: [{ action: 'Created', updateAt: '2024-03-24T12:00:00Z' }],
      },
    ],
  });

  await prisma.task.createMany({
    data: [
      {
        name: 'HTML',
        description: 'This is a sample task description.',
        dueDate: '2024-03-25T12:00:00Z',
        priority: 'Low',
        statusId: 1,
        actions: [
          { action: 'Complete task', createAt: '2024-03-24T10:00:00Z' },
          { action: 'Review task details', createAt: '2024-03-24T11:00:00Z' },
        ],
      },
      {
        name: 'Java Script',
        description: 'This is a sample task description.',
        dueDate: '2024-03-25T12:00:00Z',
        priority: 'Medium',
        statusId: 2,
        actions: [
          { action: 'Complete task', createAt: '2024-03-24T10:00:00Z' },
          { action: 'Review task details', createAt: '2024-03-24T11:00:00Z' },
        ],
      },
      {
        name: 'React',
        description: 'This is a sample task description.',
        dueDate: '2024-03-25T12:00:00Z',
        priority: 'High',
        statusId: 3,
        actions: [
          { action: 'Complete task', createAt: '2024-03-24T10:00:00Z' },
          { action: 'Review task details', createAt: '2024-03-24T11:00:00Z' },
        ],
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
