import PrismaClient from "./prisma";

const prisma = new PrismaClient();

export async function getCategory(categoryName: string) {
  let categories = await prisma.category.findMany({
    ...(categoryName && {
      where: {
        name: categoryName,
      },
    }),
  });
  if (!categories) {
    return {
      body: null,
      status: 404,
    };
  }
  return {
    body: categories[0],
    status: 200,
  };
}

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

export async function postLink(link: Record<string, any>) {
  console.log(link);
  const category = await getCategory(link.categoryName);
  if (!category.body) {
    return {
      body: null,
      status: 404,
    };
  }
  const body = await prisma.link.create({
    data: {
      link: link.link,
      email: "",
      description: link.description || "",
      categoryId: category?.body?.id,
    },
  });
  return {
    body: link,
    status: 201,
  };
}
