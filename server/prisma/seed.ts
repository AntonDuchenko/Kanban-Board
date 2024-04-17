import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.status.createMany({
    data: [
      {
        title: 'To Do',
      },
      {
        title: 'Planned',
      },
      {
        title: 'In Progress',
      },
      {
        title: 'Closed',
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
      },
      {
        name: 'Java Script',
        description: 'This is a sample task description.',
        dueDate: '2024-03-25T12:00:00Z',
        priority: 'Medium',
        statusId: 2,
      },
      {
        name: 'React',
        description: 'This is a sample task description.',
        dueDate: '2024-03-25T12:00:00Z',
        priority: 'High',
        statusId: 3,
      },
    ],
  });

  await prisma.history.createMany({
    data: [
      {
        action: 'Added',
        description: ['HTML', 'To Do'],
        taskId: 1,
        createAt: '2024-03-21T09:00:00Z',
      },
      {
        action: 'Added',
        description: ['Java Script', 'Planned'],
        taskId: 2,
        createAt: '2024-03-22T11:50:00Z',
      },
      {
        action: 'Added',
        description: ['React', 'In Progress'],
        taskId: 3,
        createAt: '2024-03-23T12:48:00Z',
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
