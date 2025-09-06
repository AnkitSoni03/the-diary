"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const HeroSection = () => {
  return (
    <section
      className={cn(
        "relative min-h-[650px] w-full overflow-hidden transition-colors duration-500",
        "bg-gradient-to-br from-white via-yellow-50 to-white dark:from-black dark:via-neutral-900 dark:to-black"
      )}
    >
      {/* Glow effects */}
      <div className="absolute inset-0">
        <div className="absolute top-24 left-16 w-72 h-72 rounded-full blur-3xl animate-pulse bg-yellow-200/40 dark:bg-yellow-400/10" />
        <div className="absolute bottom-20 right-20 w-[450px] h-[450px] rounded-full blur-3xl animate-pulse delay-500 bg-amber-200/40 dark:bg-amber-600/10" />
      </div>

      {/* Grid overlay (cross lines) */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:50px_50px] dark:bg-[linear-gradient(rgba(255,215,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.03)_1px,transparent_1px)]" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 py-16 md:flex-row md:py-20 md:pl-12">
        {/* Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="space-y-5">
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl leading-tight">
              Discover Stories
              <br />
              <span className="relative">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-extrabold">
                  Worth Reading
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full" />
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 leading-relaxed md:text-xl">
              Where every story matters and every word counts. Join thousands of
              readers exploring life's most compelling narratives.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 sm:flex-row md:justify-start">
            <Button
              size="lg"
              className="group relative overflow-hidden rounded-full px-10 py-4 text-lg font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-2xl shadow-yellow-400/25 hover:shadow-yellow-400/40 hover:scale-105"
            >
              <span className="relative z-10">Start Your Journey</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group rounded-full px-10 py-4 text-lg font-semibold text-yellow-600 dark:text-yellow-400 border-2 border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-400/10 transition-all duration-300"
            >
              Browse Articles
              <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-10 md:max-w-lg">
            <div className="group text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                1.2K+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Stories Published</div>
            </div>
            <div className="group text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                75+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Featured Authors</div>
            </div>
            <div className="group text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                15M+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Global Readers</div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="mt-14 flex-1 md:mt-0 flex justify-center">
          <div className="relative">
            <div
              className={cn(
                "relative h-[380px] w-[380px] md:h-[420px] md:w-[420px] rounded-3xl overflow-hidden",
                "bg-gradient-to-br from-yellow-200/50 via-amber-200/30 to-yellow-300/50 dark:from-yellow-500/20 dark:via-amber-500/10 dark:to-yellow-600/20",
                "border border-yellow-400/40 backdrop-blur-sm",
                "shadow-2xl shadow-yellow-500/30",
                "hover:shadow-yellow-500/40 transition-all duration-500",
                "hover:scale-105 hover:-rotate-2"
              )}
            >
              <Image
                src="/side-img2.png"
                alt="Illustration for the blog"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-yellow-300/20 dark:from-black/60 dark:via-transparent dark:to-yellow-400/10" />
            </div>
            <div className="absolute -inset-10 bg-gradient-to-r from-yellow-300/10 to-amber-300/10 dark:from-yellow-400/5 dark:to-amber-500/5 rounded-3xl -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
