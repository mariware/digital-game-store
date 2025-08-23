"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, ShoppingCart } from "lucide-react";
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

export function Header() {
  return (
    <header className="w-full flex bg-background text-foreground px-4 py-2 justify-between items-center">
      <Sheet>
        <SheetTrigger className="flex sm:hidden hover:bg-foreground hover:text-background p-2 rounded-sm">
          <Menu className="h-5 w-5" />
        </SheetTrigger>
        <SheetContent className="w-dvw" side="left">
          <SheetHeader>
            <SheetTitle className="text-xl">
              <Link
                href="/"
                className="group/logo-sidebar flex flex-row items-center gap-4 w-fit px-4 data-[active=true]:focus:bg-foreground data-[active=true]:hover:bg-foreground data-[active=true]:bg-foreground/50 data-[active=true]:text-background hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
              >
                <Logo className="fill-foreground group-hover/logo-sidebar:fill-background h-4" />
                <span className="pt-0.5">Glitch Store</span>
              </Link>
            </SheetTitle>
          </SheetHeader>
          <NavigationMenu viewport={false} className="items-start px-4">
            <NavigationMenuList className="flex flex-col items-start text-lg w-full h-full">
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-lg`}
                >
                  <Link href="/browse">Browse</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-lg`}
                >
                  <Link href="/">Latest</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-lg`}
                >
                  <Link href="/">Categories</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={`${navigationMenuTriggerStyle()} text-lg`}
                >
                  <Link href="/">Subscriptions</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <SheetFooter>Glitch Store</SheetFooter>
        </SheetContent>
      </Sheet>
      <Link
        href="/"
        className="group/logo-main flex sm:hidden flex-row items-center text-xl gap-4 w-fit px-4 data-[active=true]:focus:bg-foreground data-[active=true]:hover:bg-foreground data-[active=true]:bg-foreground/50 data-[active=true]:text-background hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
      >
        <Logo className="fill-foreground group-hover/logo-main:fill-background h-4" />
        <span className="pt-0.5">Glitch Store</span>
      </Link>
      <NavigationMenu viewport={false} className="sm:flex hidden">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link
              href="/"
              className="group/logo-main flex flex-row items-center text-xl gap-4 w-fit px-4 data-[active=true]:focus:bg-foreground data-[active=true]:hover:bg-foreground data-[active=true]:bg-foreground/50 data-[active=true]:text-background hover:bg-foreground hover:text-background focus:bg-foreground focus:text-background focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
            >
              <Logo className="fill-foreground group-hover/logo-main:fill-background h-4" />
              <span className="pt-0.5">Glitch Store</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/browse">Browse</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Latest</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Categories</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Subscriptions</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
