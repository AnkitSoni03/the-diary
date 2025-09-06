import EditArticlePage from "@/components/articles/edit-articles-page";
import { prisma } from "@/lib/prisma";
import React from "react";

type EditArticleParams = {
  params: { id: string };
};

const EditArticleServerPage: React.FC<EditArticleParams> = async ({ params }) => {
  const { id } = params;

  const article = await prisma.articles.findUnique({
    where: { id },
  });

  if (!article) return <h1>Article not found for this id: {id}</h1>;

  return (
    <div>
      <EditArticlePage article={article} />
    </div>
  );
};

export default EditArticleServerPage;
