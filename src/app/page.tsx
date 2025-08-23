import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 font-sans items-center justify-items-center min-h-screen pb-20 sm:px-20">
      <div className="relative min-h-[calc(100dvh-62px)] flex items-center justify-center px-6 overflow-hidden">
        <div className="flex flex-col gap-2 z-10 text-center max-w-4xl">
          <Logo className="h-18 sm:h-24 md:h-36" />
          <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-special tracking-tight duration-500">
            Find your next hit <br className="block lg:hidden" />
            without a hitch.
          </h1>
          <p className="text-sm md:text-base lg:text-lg">
            Level up your library with trending titles, top sellers, and hidden
            treasures.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="\browse">
              <Button
                size="lg"
                className="font-special text-base hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus-visible:ring-ring/50 rounded-sm p-2 transition-all shadow-none border-2 border-foreground focus-visible:ring-[3px] focus-visible:outline-1"
              >
                Browse the catalog <ArrowRight className="!h-5 !w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
