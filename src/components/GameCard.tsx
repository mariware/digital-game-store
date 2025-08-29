/* eslint-disable @next/next/no-img-element */

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { GameWithPrice } from "@/types/games";

export function SkeletonCard() {
  return (
    <Card className="bg-primary text-primary-foreground border-0 rounded-sm overflow-hidden gap-0 py-0">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="w-full h-full bg-foreground rounded-none" />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex flex-col p-4 items-start">
        <Skeleton className="h-8 w-3/4 bg-foreground" />
      </CardContent>
      <CardFooter className="text-sm px-4 pb-4 flex justify-between items-center">
        <Skeleton className="h-5 w-1/4 rounded-sm bg-foreground" />
        <Skeleton className="h-9 w-10.75 rounded-sm bg-foreground" />
      </CardFooter>
    </Card>
  );
}

export default function GameCard({
  game,
  showAction = true,
}: {
  game: GameWithPrice;
  showAction?: boolean;
}) {
  return (
    <Card className="bg-primary text-primary-foreground border-0 rounded-sm overflow-hidden gap-0 py-0">
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            alt={game.slug}
            className="object-cover h-full w-full"
            src={game.background_image}
          />
        </AspectRatio>
      </CardHeader>
      <CardContent className="flex flex-col p-4 items-start">
        <span className="text-2xl font-special line-clamp-1">{game.name}</span>
      </CardContent>
      {showAction ? (
        <CardFooter className="text-sm px-4 pb-4 flex justify-between items-center">
          <span>
            {game.price ? `${game.currency} ${game.price}` : "Free to Play"}
          </span>
          <Button
            variant="inverse"
            className="font-special hover:bg-foreground hover:text-background hover:scale-110"
          >
            <Plus />
          </Button>
        </CardFooter>
      ) : (
        <CardFooter className="text-sm px-4 pb-4 h-13 flex justify-between items-center">
          <span>Coming Soon</span>
        </CardFooter>
      )}
    </Card>
  );
}
