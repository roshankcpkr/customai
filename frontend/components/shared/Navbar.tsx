"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/shared/toggle-theme";

export const Navbar = () => {
  return (
    <div className="fixed w-full z-90 flex justify-between items-center py-4 px-8 h-16 border-b border-primary/20">
      <div className="flex items-center">
        <Link href="/">
          <h1
            className={cn(
              "hidden md:block text-xl md:text-2xl font-bold text-primary"
            )}
          >
            Custom AI
          </h1>
        </Link>
      </div>
      <div className="flex items-center gap-x-3">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};
