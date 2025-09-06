import { BlogFooter } from "@/components/home/footer";
import Navbar from "@/components/home/header/navbar";
import HeroSection from "@/components/home/hero-section";
import TopArticles from "@/components/home/top-article";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <section className="relative py-20 md:py-28 bg-white dark:bg-neutral-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-yellow-500 dark:text-yellow-400">
              Featured Articles
            </h2>
            <div className="mx-auto mt-4 h-1 w-28 rounded-full bg-yellow-500 dark:bg-yellow-400"></div>
            <p className="mt-6 text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              Discover our most popular and trending content
            </p>
          </div>

          {/* Top Articles */}
          <TopArticles />

          <div className="mt-16 text-center">
            <Link href={"/articles"}>
              <Button
                variant="outline"
                className="rounded-full border-2 border-yellow-500 px-10 py-6 text-xl font-semibold text-yellow-600 dark:text-yellow-400 transition hover:bg-yellow-500 hover:text-black dark:hover:bg-yellow-400 dark:hover:text-black"
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
