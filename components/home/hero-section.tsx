"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();

  return (
    <section
      className={cn(
        "relative min-h-[500px] w-full overflow-hidden transition-colors duration-500", // 👈 height kam ki
        "bg-gradient-to-br from-white via-yellow-50 to-white dark:from-black dark:via-neutral-900 dark:to-black",
        "pt-0" // 👈 navbar ke sath gap kam kiya
      )}
    >
      {/* Background Orbs */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full blur-3xl animate-pulse bg-yellow-300/30 dark:bg-yellow-500/20" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full blur-3xl animate-pulse delay-500 bg-amber-400/30 dark:bg-amber-600/20" />
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px] dark:bg-[linear-gradient(rgba(255,215,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,215,0,0.05)_1px,transparent_1px)]" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-6 py-16 md:flex-row md:py-20 md:pl-12">
        {/* Left Content */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl leading-snug">
              Write. Share. Inspire.
              <br />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 bg-clip-text text-transparent font-extrabold drop-shadow-md">
                  The Diary
                </span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg shadow-yellow-500/40" />
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-gray-600 dark:text-gray-300 leading-relaxed md:text-lg">
              Your personal corner on the internet 🌍 — a place to{" "}
              <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                capture thoughts, share stories, and connect
              </span>{" "}
              with readers worldwide. Because every word deserves to be heard.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row md:justify-start">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard/articles/create")} // 👈 redirect
              className="group relative overflow-hidden rounded-full px-8 py-3 text-base font-semibold bg-gradient-to-r from-yellow-400 to-amber-500 text-black hover:from-yellow-300 hover:to-amber-400 transition-all duration-300 shadow-lg hover:shadow-yellow-400/50 hover:scale-105"
            >
              <span className="relative z-10">Start Writing</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="group rounded-full px-8 py-3 text-base font-semibold text-yellow-600 dark:text-yellow-400 border-2 border-yellow-500/30 hover:border-yellow-500 hover:bg-yellow-400/10 transition-all duration-300"
            >
              Browse Articles
              <div className="ml-2 transition-transform group-hover:translate-x-1">→</div>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-10 md:max-w-lg">
            {[
              { number: "2K+", label: "Stories Shared" },
              { number: "150+", label: "Active Writers" },
              { number: "25K+", label: "Daily Readers" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/60 dark:bg-black/40 backdrop-blur-md border border-yellow-500/20 shadow-md shadow-yellow-500/10 hover:shadow-yellow-500/30 transition"
              >
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="mt-10 flex-1 md:mt-0 flex justify-center">
          <div className="relative">
            <div
              className={cn(
                "relative h-[300px] w-[300px] md:h-[450px] md:w-[450px] rounded-3xl overflow-hidden", // 👈 image chhoti
                "bg-gradient-to-br from-yellow-200/50 via-amber-200/30 to-yellow-300/50 dark:from-yellow-500/20 dark:via-amber-500/10 dark:to-yellow-600/20",
                "border border-yellow-400/40 backdrop-blur-sm",
                "shadow-xl shadow-yellow-500/30",
                "hover:shadow-yellow-500/40 transition-all duration-500",
                "hover:scale-105 hover:-rotate-2"
              )}
            >
              <Image
                src="/side-img2.png"
                alt="Writing illustration for The Diary"
                fill
                className="object-cover transition-transform duration-500 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-yellow-300/20 dark:from-black/70 dark:via-transparent dark:to-yellow-400/10" />
            </div>
            <div className="absolute -inset-10 bg-gradient-to-r from-yellow-300/20 to-amber-300/20 dark:from-yellow-400/10 dark:to-amber-500/10 rounded-3xl -z-10 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
