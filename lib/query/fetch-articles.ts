import { prisma } from "@/lib/prisma";

export const fetchArticleByQuery = async (searchText: string, skip: number, take: number) => {
  const [articles, total] = await prisma.$transaction([
    prisma.articles.findMany({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
      include: {
        comments: true, // Add this line to include comments
        author: {
          select: { name: true, imageUrl: true, email: true },
        },
      },
      skip: skip,
      take: take,
      orderBy: { createdAt: 'desc' }, // Optional: to maintain consistent ordering
    }),
    prisma.articles.count({
      where: {
        OR: [
          { title: { contains: searchText, mode: 'insensitive' } },
          { category: { contains: searchText, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  return { articles, total };
};