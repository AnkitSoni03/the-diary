import React from 'react'
import { Card } from '../ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

function TopArticles() {
  return (
  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    <Card
      key={""}
      className={cn(
        "group relative overflow-hidden rounded-2xl shadow-md transition-all hover:shadow-xl hover:scale-[1.02]",
        "border border-yellow-400/30 dark:border-yellow-400/20",
        "bg-white dark:bg-neutral-950 backdrop-blur-lg"
      )}
    >
      <div className="p-5">
        <Link href={`/articles/${1234}`}>
          {/* Image Container */}
          <div className="relative mb-4 h-36 w-full overflow-hidden rounded-xl">
            <Image
              src="/side-img2.png"
              alt={"article"}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <Avatar className="h-8 w-8 border border-yellow-400/40">
              <AvatarImage src="/side-img2.png" />
              <AvatarFallback className="text-yellow-500">A</AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-800 dark:text-gray-300">
              Bhai mai hu
            </span>
          </div>

          {/* Article Title */}
          <h3 className="mt-3 text-lg font-bold tracking-wide text-gray-900 dark:text-white group-hover:text-yellow-500">
            Haa bolo
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            kaise ho
          </p>

          {/* Article Meta Info */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
            <span className="italic">Lol</span>
            <span className="text-yellow-500 font-medium">{12} min read</span>
          </div>
        </Link>
      </div>
    </Card>
  </div>
);

}

export default TopArticles
