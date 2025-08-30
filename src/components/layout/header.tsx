"use client";

/* eslint-disable @next/next/no-img-element */

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, Minus, ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "../ui/sheet";
import { Logo } from "../ui/logo";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { removeInCartGame, resetInCartGames } from "@/store/slices/gamesSlice";

export function Header() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.games.inCartGames);
  const removeFromCart = (id: number) => {
    dispatch(removeInCartGame(id));
  };

  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/latest", label: "Latest" },
    { href: "/categories", label: "Categories" },
  ];

  const logoLinkClasses =
    "group/logo flex flex-row items-center gap-4 w-fit px-4 rounded-sm p-2 transition-all outline-none " +
    "hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background " +
    "data-[active=true]:bg-foreground/50 data-[active=true]:text-background " +
    "focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:outline-1";

  const checkout = () => {
    const total = cart.reduce((total, game) => total + (game.price || 0), 0);
    alert(
      `The total price is USD ${total}.\nThis is a demo store. No actual purchases will be made.`,
    );
    dispatch(resetInCartGames());
  };

  return (
    <header className="w-full flex bg-background text-foreground px-4 py-2 justify-between items-center">
      <Sheet>
        <SheetTrigger className="flex sm:hidden hover:bg-foreground hover:text-background p-2 rounded-sm">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="w-content" side="left">
          <SheetHeader>
            <SheetTitle className="text-xl">
              <Link href="/" className={logoLinkClasses}>
                <Logo className="fill-foreground group-hover/logo:fill-background h-4 group-focus/logo:fill-background" />
                <span className="pt-0.5">Glitch Store</span>
              </Link>
            </SheetTitle>
          </SheetHeader>

          <NavigationMenu viewport={false} className="items-start px-4">
            <NavigationMenuList className="flex flex-col items-start text-lg w-full h-full">
              {navLinks.map(({ href, label }) => (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} text-lg`}
                  >
                    <Link href={href}>{label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          <SheetFooter>Glitch Store</SheetFooter>
        </SheetContent>
      </Sheet>

      <Link href="/" className={`${logoLinkClasses} sm:hidden text-xl`}>
        <Logo className="fill-foreground group-hover/logo:fill-background h-4 group-focus/logo:fill-background" />
        <span className="pt-0.5">Glitch Store</span>
      </Link>

      <NavigationMenu viewport={false} className="sm:flex hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" className={`${logoLinkClasses} text-xl`}>
              <Logo className="fill-foreground group-hover/logo:fill-background h-4 group-focus/logo:fill-background" />
              <span className="pt-0.5">Glitch Store</span>
            </Link>
          </NavigationMenuItem>
          {navLinks.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={href}>{label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Sheet>
        <SheetTrigger className="hover:bg-foreground hover:text-background p-2 rounded-sm">
          <ShoppingCart className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="w-dvw sm:w-[540px] p-2">
          <SheetHeader>
            <SheetTitle className="text-xl flex flex-row items-center gap-4">
              <ShoppingCart className="h-4 w-4" />
              Shopping Cart
            </SheetTitle>
            <SheetDescription className="font-sans text-foreground">
              This cart contains all games you selected.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col px-2 gap-2 overflow-scroll no-scrollbar max-h-dvh">
            {cart.length === 0 ? (
              <p className="flex w-full justify-center">Your cart is empty.</p>
            ) : (
              cart.map((game) => (
                <Link href={`/games/${game.id}`} key={game.id}>
                  <div className="flex p-2 justify-between items-center rounded-sm border-2 border-background hover:border-foreground">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-sm overflow-hidden">
                        <AspectRatio ratio={1 / 1}>
                          <img
                            alt={game.slug}
                            className="object-cover h-full"
                            src={game.background_image}
                          />
                        </AspectRatio>
                      </div>
                      <span className="font-special max-w-36 text-clip line-clamp-1">
                        {game.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-sans text-sm">
                        {game.price ? `${game.currency} ${game.price}` : "Free"}
                      </span>
                      <Button
                        size="sm"
                        className="font-special hover:bg-foreground hover:text-background hover:scale-110 border-none p-0"
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromCart(game.id);
                        }}
                      >
                        <Minus />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          <SheetFooter>
            <div className="flex justify-between">
              <span>Total: </span>
              <span className="font-sans font-bold">
                {cart.reduce((total, game) => total + (game.price || 0), 0) ===
                0
                  ? "Free"
                  : cart[0]?.currency +
                    " " +
                    cart.reduce((total, game) => total + (game.price || 0), 0)}
              </span>
            </div>
            <Button
              variant="inverse"
              size="sm"
              className="font-special hover:bg-foreground hover:text-background hover:scale-105 border-none p-0"
              onClick={checkout}
              disabled={cart.length === 0}
            >
              Checkout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}
