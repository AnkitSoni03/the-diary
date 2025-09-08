import { BlogFooter } from "@/components/home/footer";
import Navbar from "@/components/home/header/navbar";
import HeroSection from "@/components/home/hero-section";
import { TopArticles } from "@/components/home/top-article";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />

      {/* Featured Articles */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-white via-yellow-50 to-white dark:from-black dark:via-neutral-900 dark:to-black">
        {/* Decorative orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-yellow-300/20 dark:bg-yellow-500/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-400/20 dark:bg-amber-600/10 blur-3xl animate-pulse delay-300" />
        </div>

        <div className="container relative mx-auto px-4">
          {/* Heading */}
          <div className="mb-14 text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Featured{" "}
              <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                Articles
              </span>
            </h2>
            <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 shadow-md shadow-yellow-500/30"></div>
            <p className="mt-6 text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Discover our most{" "}
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                popular
              </span>{" "}
              and{" "}
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                trending
              </span>{" "}
              content, carefully picked for you ✨
            </p>
          </div>

          {/* Top Articles */}
          <TopArticles />

          {/* Button */}
          <div className="mt-14 text-center">
            <Link href="/articles">
  <Button
    size="lg"
    className="rounded-full px-8 py-3 text-base font-medium
               bg-white text-yellow-500
               dark:bg-black dark:text-yellow-500 
               transition-all duration-300
               hover:bg-yellow-500 hover:text-white
               dark:hover:bg-yellow-500 dark:hover:text-gray-900
               shadow-md hover:shadow-lg"
  >
    View All Articles
  </Button>
</Link>

          </div>
        </div>
      </section>

      <BlogFooter />
    </>
  );
}
