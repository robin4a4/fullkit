import PrismaClient from "./prisma";

const prisma = new PrismaClient();

export async function getCategories() {
  let categories = await prisma.category.findMany();
  if (!categories) {
    return {
      body: [],
      status: 404,
    };
  }
  return {
    body: categories,
    status: 200,
  };
}

export async function getLinks(categoryName?: string | null) {
  const links = await prisma.link.findMany({
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
  if (!links) {
    return {
      body: [],
      status: 404,
    };
  }
  return {
    body: links,
    status: 200,
  };
}
