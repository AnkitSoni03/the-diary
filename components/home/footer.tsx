import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function BlogFooter() {
  return (
    <footer className="border-t bg-background text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Branding Section */}
          <div className="md:col-span-2 lg:col-span-2">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/the-diary-logo.png"
                  alt="The Diary Logo"
                  width={180}
                  height={80}
                  className="h-auto w-auto"
                />
              </Link>
            </div>
            <p className="mt-4 text-muted-foreground">
              Where ideas meet innovation. Dive into a world of insightful 
              articles written by passionate thinkers and industry experts.
            </p>
            
            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-500 hover:text-white transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-500 hover:text-white transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-gradient-to-r from-yellow-500 to-yellow-600 text-yellow-500 hover:text-white transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Explore</h3>
            <ul className="space-y-3">
              {["All Articles", "Topics", "Authors", "Podcasts"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-yellow-500">Legal</h3>
            <ul className="space-y-3">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Licenses"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-yellow-500 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4 md:col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-yellow-500">Stay Updated</h3>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-6 border-yellow-500 focus:ring-yellow-500 dark:focus:ring-yellow-400"
                />
                <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium hover:opacity-90 transition"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} <span className="text-yellow-500 font-semibold">The Diary</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
