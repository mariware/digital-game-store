"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { Separator } from "../ui/separator";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  return (
    <footer className="w-full flex flex-col font-sans text-sm bg-foreground text-neutral-100 p-4 pb-8 gap-4 justify-between items-center">
      <div className="flex flex-col w-full font-special items-center sm:flex-row sm:justify-around gap-2">
        <Logo variant="boxed" className="h-9 sm-2 sm:mb-0" />
        <Link
          href="/"
          className="w-fit px-4 data-[active=true]:focus:bg-background data-[active=true]:hover:bg-background data-[active=true]:bg-background/50 data-[active=true]:text-foreground hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        >
          <span className="pt-0.5">Browse</span>
        </Link>
        <Link
          href="/"
          className="w-fit px-4 data-[active=true]:focus:bg-background data-[active=true]:hover:bg-background data-[active=true]:bg-background/50 data-[active=true]:text-foreground hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        >
          <span className="pt-0.5">Latest</span>
        </Link>
        <Link
          href="/"
          className="w-fit px-4 data-[active=true]:focus:bg-background data-[active=true]:hover:bg-background data-[active=true]:bg-background/50 data-[active=true]:text-foreground hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        >
          <span className="pt-0.5">Categories</span>
        </Link>
        <Link
          href="/"
          className="w-fit px-4 data-[active=true]:focus:bg-background data-[active=true]:hover:bg-background data-[active=true]:bg-background/50 data-[active=true]:text-foreground hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground focus-visible:ring-ring/50 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1"
        >
          <span className="pt-0.5">Subscriptions</span>
        </Link>
      </div>
      <Separator className="bg-muted-foreground/50" />
      <div className="w-full px-0 sm:px-24 flex-col sm:flex-row text-muted-foreground text-xs flex justify-between gap-4 items-center">
        <p>&#169; 2025 mariware. All Rights Reserved.</p>
        <div className="flex gap-2">
          <Link
            href="https://github.com/mariware"
            className="p-1 rounded-sm hover:bg-background hover:text-foreground"
          >
            <Github />
          </Link>
          <Link
            href="https://linkedin.com/in/offcllance"
            className="p-1 rounded-sm hover:bg-background hover:text-foreground"
          >
            <Linkedin />
          </Link>
        </div>
      </div>
      <Button size="sm" className="font-special">
        Back to Top <ArrowUp />
      </Button>
    </footer>
  );
}
