
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Prisma } from "@prisma/client";

type SearchPageProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      comments: true;
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        }
      }
    }
  }>[];
};

export function AllArticlesPage({ articles }: SearchPageProps) {
  if (articles.length === 0) return <NoSearchResults />;
  
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {articles.map((article) => (
        <div
          key={article.id}
          className="group relative bg-white dark:bg-black rounded-3xl overflow-hidden shadow-sm transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-amber-300 dark:hover:border-amber-400"
        >
          <Link href={`/articles/${article.id}`} className="block h-full">
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={article.featuredImage as string}
                alt={article.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              
              {/* Category Tag */}
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg">
                  {article.category}
                </span>
              </div>

              {/* Author Info Overlay */}
              <div className="absolute bottom-4 left-4 flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white shadow-md">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback className="bg-amber-500 text-white font-bold">
                    {article.author.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-white">
                  <p className="font-medium text-sm">{article.author.name}</p>
                  <p className="text-xs opacity-90">
                    {new Date(article.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">
                {article.title}
              </h3>
              
              {/* Content Preview */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed line-clamp-2">
                {article.content?.replace(/<[^>]*>/g, '').substring(0, 120)}...
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span className="font-medium">{article.comments?.length || 0} comments</span>
                <span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                  6 min read
                </span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </Link>
        </div>
      ))}
    </div>
  );
}

export function NoSearchResults() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Icon */}
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8 text-muted-foreground" />
      </div>
      {/* Title */}
      <h3 className="text-xl font-semibold text-foreground">
        No Results Found
      </h3>
      {/* Description */}
      <p className="mt-2 text-muted-foreground">
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </p>
    </div>
  );
}