import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Genre } from "@/types/games";
import Link from "next/link";

export function SkeletonCard() {
  return (
    <Card className="relative bg-primary text-primary-foreground border-0 rounded-sm overflow-hidden py-0">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="absolute inset-0 bg-black/60 group-hover:bg-black/40 rounded-none transition-colors" />
      </AspectRatio>
    </Card>
  );
}

export default function GenreCard({ genre }: { genre: Genre }) {
  return (
    <Link href={`/categories/${genre.slug}`}>
      <Card
        className="group relative bg-cover text-primary-foreground border-0 rounded-sm overflow-hidden gap-0 py-0"
        style={{ backgroundImage: `url(${genre.image_background})` }}
      >
        <AspectRatio ratio={16 / 9}>
          <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors" />
        </AspectRatio>
        <CardContent className="absolute flex flex-col p-4 z-1 text-center top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">
          <span className="text-3xl font-special text-background group-hover:scale-120">
            {genre.name}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
}
