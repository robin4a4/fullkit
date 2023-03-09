import PrismaClient from "../lib/prisma";

const prisma = new PrismaClient();

export async function getCategories() {
  let body = await prisma.category.findMany();
  return {
    body,
    status: body ? 200 : 404,
  };
}

export async function getLinks(categoryName?: string) {
  return await prisma.link.findMany({
    ...(categoryName && {
      where: {
        category: {
          name: categoryName,
        },
      },
    }),
    orderBy: [
      {
        id: "desc",
      },
    ],
    include: {
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

