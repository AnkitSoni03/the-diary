import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { Prisma } from "@prisma/client";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import { prisma } from "@/lib/prisma"; 
import { auth } from "@clerk/nextjs/server";
import LikeButton from "./like-button";
import Image from "next/image";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInMinutes < 1) return 'just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export async function ArticleDetailPage({ article }: ArticleDetailPageProps) {
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });
 
  const likes = await prisma.like.findMany({where:{articleId:article.id}});
  const {userId} = await auth();
  const user = await prisma.user.findUnique({where:{clerkUserId:userId as string}});

  const isLiked = likes.some((like) => like.userId === user?.id);

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-6 py-12">
        <article>
          {/* Header */}
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 text-sm font-medium rounded-full mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback className="bg-amber-500 text-white">
                  {article.author.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {article.author.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTimeAgo(new Date(article.createdAt))}
                </p>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-96 rounded-lg overflow-hidden mb-8">
            <Image
              src={article.featuredImage as string}
              alt={article.title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div 
            className="prose prose-lg dark:prose-invert max-w-none mb-12 text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Like Button */}
          <div className="mb-12">
            <LikeButton articleId={article.id} likes={likes} isLiked={isLiked}/>
          </div>

          {/* Comments Section */}
          <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
            <div className="flex items-center gap-2 mb-8">
              <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {comments.length} Comments
              </h2>
            </div>

            <div className="space-y-6">
              <CommentForm articleId={article.id} />
              <CommentList comments={comments} />
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}