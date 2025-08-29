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
        </SheetContent>
      </Sheet>
    </header>
  );
}
