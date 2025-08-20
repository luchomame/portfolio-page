"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import ThemeToggle from "./ThemeToggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/education", label: "Education" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur border-b">
      <nav className="container flex items-center justify-between py-3 text-foreground">
        {/* Brand */}
        <Link
          href="/"
          className={clsx(
            "font-bold text-lg rounded-md",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          Luis Tupac
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop nav */}
          <ul className="hidden sm:flex gap-2">
            {links.map((l) => {
              const active = pathname === l.href;
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={clsx(
                      "px-3 py-1 rounded-full transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      active
                        ? "bg-muted text-foreground"
                        : "text-foreground hover:bg-muted/70 hover:text-foreground"
                    )}
                  >
                    {l.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Theme toggle (always visible) */}
          <ThemeToggle />

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="sm:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <ul className="mt-4 space-y-2">
                {links.map((l) => {
                  const active = pathname === l.href;
                  return (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className={clsx(
                          "block w-full px-3 py-2 rounded-md",
                          active
                            ? "bg-muted text-foreground"
                            : "text-foreground hover:bg-muted/70"
                        )}
                      >
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
