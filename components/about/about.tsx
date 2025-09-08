import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground mb-4">
            About <span className="text-yellow-500">The Diary</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A space where thoughts turn into stories, and stories inspire the world.
          </p>
        </section>

        {/* About Content */}
        <section className="max-w-3xl mx-auto mb-16 text-center space-y-6">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            The Diary is a modern blogging platform where you can write, share, 
            and discover ideas. Our mission is to provide a clean, distraction-free 
            space for creators and readers.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Whether you&apos;re here to learn, express your thoughts, or simply enjoy 
            inspiring content, The Diary is your digital home for creativity.
          </p>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">Meet the Creator</h2>
          <div className="flex justify-center">
            <Card className="w-full max-w-sm rounded-2xl shadow-md">
              <CardContent className="flex flex-col items-center p-6">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src="/profile.png" alt="Creator" />
                  <AvatarFallback className="bg-yellow-500 text-white text-xl font-bold">
                    A
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-lg font-semibold text-foreground">Ankit Soni</h3>
                <p className="text-sm text-muted-foreground">Founder & Developer</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Mission / CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            To empower individuals with a platform where every story matters, 
            every idea gets space, and every voice is heard.
          </p>
          <Link
            href="/articles"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-medium px-6 py-3 rounded-full shadow-md transition-all"
          >
            Explore Articles
          </Link>
        </section>
      </main>
    </div>
  );
}
