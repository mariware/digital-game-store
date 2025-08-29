"use client";

import * as React from "react";
import Link from "next/link";
import { Logo } from "../ui/logo";
import { Separator } from "../ui/separator";
import { ArrowUp, Github, Linkedin } from "lucide-react";
import { Button } from "../ui/button";

export function Footer() {
  const navLinks = [
    { href: "/browse", label: "Browse" },
    { href: "/latest", label: "Latest" },
    { href: "/categories", label: "Categories" },
    { href: "/subscriptions", label: "Subscriptions" },
  ];

  const baseLinkClasses =
    "w-fit px-4 rounded-sm p-2 transition-all outline-none focus-visible:ring-[3px] focus-visible:outline-1 " +
    "hover:bg-background hover:text-foreground focus:bg-background focus:text-foreground " +
    "data-[active=true]:bg-background/50 data-[active=true]:text-foreground " +
    "data-[active=true]:hover:bg-background data-[active=true]:focus:bg-background " +
    "data-[active=true]:focus:text-foreground focus-visible:ring-ring/50";

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full flex flex-col font-sans text-sm bg-foreground text-neutral-100 p-4 pb-8 gap-4 justify-between items-center">
      <div className="flex flex-col w-full font-special items-center sm:flex-row sm:justify-around gap-2">
        <Logo variant="boxed" className="h-9 mb-2 sm:mb-0" />
        {navLinks.map(({ href, label }) => (
          <Link key={href} href={href} className={baseLinkClasses}>
            <span className="pt-0.5">{label}</span>
          </Link>
        ))}
      </div>

      <Separator className="bg-muted-foreground/50" />

      <div className="w-full px-4 flex-col sm:flex-row text-muted-foreground text-xs flex justify-between gap-4 items-center text-center">
        <p>
          &#169; 2025 mariware. All rights reserved.{" "}
          <br className="flex sm:hidden" />
          Data provided by{" "}
          <Link href="https://rawg.io/apidocs" className="underline">
            RAWG API
          </Link>{" "}
          and{" "}
          <Link href="https://www.nexarda.com/" className="underline">
            NEXARDA
          </Link>
          .
        </p>
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

      <Button
        size="sm"
        className="font-special"
        onClick={handleBackToTop}
        aria-label="Back to top"
      >
        Back to Top <ArrowUp />
      </Button>
    </footer>
  );
}
